/**
 * DAYONE progress-photo registration.
 * Uses a similarity transform only: translation + uniform scale + rotation.
 * This deliberately does NOT deform the subject, stretch body parts, or alter either original photo.
 * No photos are uploaded for inference.
 */

const POSE_KEYS = [
  [11, 3], [12, 3], // shoulders
  [23, 4], [24, 4], // hips
  [25, .7], [26, .7], // knees (less influence; variable pose)
  [27, .3], [28, .3], // ankles
  [0, .35]           // nose
];

export function fittedImageRect(imageWidth, imageHeight, viewWidth, viewHeight) {
  const ratio = Math.min(viewWidth / imageWidth, viewHeight / imageHeight);
  const w = imageWidth * ratio, h = imageHeight * ratio;
  return {x: (viewWidth - w) / 2, y: (viewHeight - h) / 2, width: w, height: h};
}

const isVisible = pt => pt && Number.isFinite(pt.x) && Number.isFinite(pt.y) &&
  (pt.visibility === undefined || pt.visibility >= .42) &&
  (pt.presence === undefined || pt.presence >= .42);

/** Pure/testable two-photo pose fit. Landmark points use MediaPipe's 0–1 image coordinates. */
export function computePoseAlignment(reference, later, geometry) {
  if (!Array.isArray(reference) || !Array.isArray(later) || !geometry) return null;
  const {width: vw, height: vh, beforeWidth, beforeHeight, afterWidth, afterHeight} = geometry;
  if (!(vw > 0 && vh > 0 && beforeWidth > 0 && afterWidth > 0)) return null;
  const a = fittedImageRect(beforeWidth, beforeHeight, vw, vh);
  const b = fittedImageRect(afterWidth, afterHeight, vw, vh);
  const pairs = [];
  for (const [idx, weight] of POSE_KEYS) {
    const p = reference[idx], q = later[idx];
    if (!isVisible(p) || !isVisible(q)) continue;
    pairs.push({i: idx, w: weight, x: a.x+p.x*a.width, y: a.y+p.y*a.height,
      u: b.x+q.x*b.width, v: b.y+q.y*b.height});
  }
  // Shoulder + hip anchors are essential. Don't invent a fit from just a head or legs.
  if (pairs.length < 3 || !pairs.some(p=>[11,12].includes(p.i)) ||
      !pairs.some(p=>[23,24].includes(p.i))) return null;
  const sum = pairs.reduce((s,p)=>s+p.w,0);
  const mean = key => pairs.reduce((s,p)=>s+p[key]*p.w,0)/sum;
  const px=mean('x'),py=mean('y'),qx=mean('u'),qy=mean('v');
  let dot=0,cross=0,denom=0;
  for (const p of pairs) {
    const x=p.u-qx,y=p.v-qy, X=p.x-px,Y=p.y-py;
    dot+=p.w*(x*X+y*Y);
    cross+=p.w*(x*Y-y*X);
    denom+=p.w*(x*x+y*y);
  }
  if (denom < 25) return null;
  const scale = Math.hypot(dot,cross)/denom;
  const angle = Math.atan2(cross,dot);
  if (!Number.isFinite(scale) || scale < .5 || scale > 2.1 || Math.abs(angle) > Math.PI/9) return null;
  const co=Math.cos(angle),si=Math.sin(angle), cx=vw/2,cy=vh/2;
  const tx=px-cx-scale*(co*(qx-cx)-si*(qy-cy));
  const ty=py-cy-scale*(si*(qx-cx)+co*(qy-cy));
  const rms=Math.sqrt(pairs.reduce((sum,p)=>{
    const xp=cx+tx+scale*(co*(p.u-cx)-si*(p.v-cy));
    const yp=cy+ty+scale*(si*(p.u-cx)+co*(p.v-cy));
    return sum+p.w*((xp-p.x)**2+(yp-p.y)**2);
  },0)/sum);
  return {
    scale: Math.round(scale*10000)/10000,
    angle: Math.round(angle*180/Math.PI*100)/100,
    dx: tx/vw*100, dy: ty/vh*100,  // viewport percentages, stable on resize
    rms, landmarks: pairs.length,
    quality: rms/Math.min(vw,vh) < .055 ? 'good' : 'review'
  };
}

let detectorPromise;
async function getDetector() {
  if (!detectorPromise) detectorPromise = (async () => {
    // Pinned free public model / runtime; downloads code and weights only. Never sends user photos.
    // Prefer the model and WASM bundled by Netlify's free build. Source ZIP
    // also supports CDN fallback when deployed directly without a build.
    const localBase='/vendor/pose';
    const localModel=localBase+'/pose_landmarker_lite.task';
    const localExists=!navigator.onLine
      ? localStorage.getItem('dayone-pose-local-ready')==='1'
      : await fetch(localModel,{method:'HEAD',cache:'force-cache'}).then(r=>r.ok).catch(()=>false);
    let FilesetResolver,PoseLandmarker,wasmBase,modelUrl;
    if(localExists){
      ({FilesetResolver,PoseLandmarker}=await import(localBase+'/vision_bundle.mjs'));
      wasmBase=localBase+'/wasm';modelUrl=localModel;
    }else{
      ({FilesetResolver,PoseLandmarker}=await import(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/vision_bundle.mjs'
      ));
      wasmBase='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm';
      modelUrl='https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
    }
    const vision = await FilesetResolver.forVisionTasks(wasmBase);
    const detector=await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: modelUrl,
        delegate: 'CPU'
      },
      runningMode: 'IMAGE', numPoses: 1,
      minPoseDetectionConfidence: .5,
      minPosePresenceConfidence: .5,
      outputSegmentationMasks: false
    });
    if(localExists){try{localStorage.setItem('dayone-pose-local-ready','1')}catch{}}
    return detector;
  })().catch(error=>{detectorPromise=null;throw error});
  return detectorPromise;
}
export async function autoAlignPhotos(beforeImage, afterImage, viewport) {
  if (!beforeImage?.naturalWidth || !afterImage?.naturalWidth) throw Error('Add both photos first.');
  const detector = await getDetector();
  // Landmark detection is synchronous (MediaPipe); source images remain entirely on device.
  const before = detector.detect(beforeImage).landmarks?.[0];
  const after = detector.detect(afterImage).landmarks?.[0];
  if (!before || !after) throw Error('Could not detect a full person in both photos. Use manual adjustments.');
  const result=computePoseAlignment(before, after, {
    width: viewport.clientWidth, height: viewport.clientHeight,
    beforeWidth: beforeImage.naturalWidth, beforeHeight: beforeImage.naturalHeight,
    afterWidth: afterImage.naturalWidth, afterHeight: afterImage.naturalHeight
  });
  if (!result) throw Error('These camera angles or body poses differ too much for a reliable match. Use manual adjustments.');
  return result;
}
