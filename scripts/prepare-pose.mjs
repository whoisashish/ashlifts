/** Optional local model bundling for Netlify build: no inference API or subscriptions. */
import {cpSync, existsSync, mkdirSync, writeFileSync, rmSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {createWriteStream} from 'node:fs';

const dest=resolve('site/vendor/pose');
const library=resolve('node_modules/@mediapipe/tasks-vision');
mkdirSync(dest,{recursive:true});
const base=join(library,'vision_bundle.mjs');
if(existsSync(base)) {
  cpSync(base,join(dest,'vision_bundle.mjs'));
  if(existsSync(join(library,'wasm')))cpSync(join(library,'wasm'),join(dest,'wasm'),{recursive:true});
  console.log('Bundled MediaPipe runtime on Netlify.');
} else console.warn('MediaPipe package unavailable. Browser will try the free public model CDN.');
const model=join(dest,'pose_landmarker_lite.task');
if(!existsSync(model)){
 try{
  const url='https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),45000);
  try {
   const response=await fetch(url,{signal:controller.signal});
   if(!response.ok || !response.body)throw Error(`Model download HTTP ${response.status}`);
   const count=Number(response.headers.get('content-length')||0);
   if(count>22*1024*1024)throw Error('Unexpected model size');
   await pipeline(Readable.fromWeb(response.body),createWriteStream(model));
   console.log('Pose model hosted with Netlify static files.');
  }finally{clearTimeout(timeout)}
 }catch(error){try{rmSync(model,{force:true})}catch{}console.warn('Optional model bundling unavailable:',error.message,'— CDN fallback remains available.');}
}
console.log('DAYONE build ready.');
