/** On-demand, non-commercial, attribution-aware exercise demonstrations.
 * This is an auxiliary reference catalog, not the Akash Fitness course.
 * We never harvest or copy vendor media into this deployment.
 */
const provider='ExerciseDB by AscendAPI';
const providerDocs='https://oss.exercisedb.dev/docs';
const gifBase='https://static.exercisedb.dev/media/';
const COMMONS={
 'push ups':'Pushups.gif',
 'bodyweight squats':'Squats.gif',
 'burpees':'Burpees.gif',
 'jumping jacks':'Jumpingjacks.gif',
 'leg raises':'Legraises.gif',
 'pull ups':'Pullup.gif',
 'back extension':'800px-RomanChairBackExtension.gif',
};
const ALIASES={
 'incline dumbbell press':'incline dumbbell bench press',
 'incline db press':'incline dumbbell bench press',
 'incline barbell press':'incline barbell bench press',
 'incline bench press':'incline barbell bench press',
 'machine incline press':'incline machine chest press',
 'pec deck fly':'pec deck butterfly',
 'pec deck machine':'pec deck butterfly',
 'pec deck fly cable fly':'pec deck fly',
 'flat dumbbell fly':'dumbbell fly',
 'flat cable fly':'cable fly',
 'cable chest fly':'cable chest fly',
 'cable fly low to high':'low to high cable fly',
 'seated db shoulder press':'seated dumbbell shoulder press',
 'db shoulder press':'dumbbell shoulder press',
 'side lateral raises':'dumbbell lateral raise',
 'lateral delt raises':'dumbbell lateral raise',
 'lateral raises':'dumbbell lateral raise',
 'db lateral raises':'dumbbell lateral raise',
 'db lateral raises light':'dumbbell lateral raise',
 'dumbbell shoulder press':'dumbbell shoulder press',
 'face pulls':'cable face pull',
 'barbell squats':'barbell squat',
 'bodyweight squats':'bodyweight squat',
 'goblet squats light db':'dumbbell goblet squat',
 'leg curls':'seated leg curl',
 'lying leg curls':'lying leg curl',
 'leg curls light':'leg curl',
 'standing calf raises':'standing calf raise',
 'seated calf raises':'seated calf raise',
 'calf raises':'standing calf raise',
 'leg extensions light':'leg extension',
 'deadlift rack pulls':'barbell deadlift',
 'weighted pull ups lat pulldown':'lat pulldown',
 'weighted pull ups lat pd':'lat pulldown',
 'lat pulldown wide':'wide grip lat pulldown',
 'lat pulldown wide grip':'wide grip lat pulldown',
 'lat pulldown close':'close grip lat pulldown',
 'db renegade rows':'dumbbell renegade row',
 'bent over db rows':'bent over dumbbell row',
 'db row light':'single arm dumbbell row',
 't bar row':'t bar row',
 'dumbbell bicep curls':'dumbbell biceps curl',
 'db bicep curls':'dumbbell biceps curl',
 'bicep curls light':'dumbbell biceps curl',
 'tricep rope pushdown':'cable rope tricep pushdown',
 'rope pushdown':'cable rope tricep pushdown',
 'tricep pushdown':'cable tricep pushdown',
 'tricep pushdown cable':'cable tricep pushdown',
 'overhead tricep extension':'overhead triceps extension',
 'overhead db extension':'overhead dumbbell triceps extension',
 'plank hold':'plank',
 'side plank hold':'side plank',
 'ab vacuums crunches':'abdominal vacuum',
 'ab vacuum pose':'abdominal vacuum',
 'ab vacuums':'abdominal vacuum',
 'walking lunges':'walking lunge',
 'hip thrusts glute bridge':'barbell hip thrust',
 'glute bridge':'glute bridge',
 'dips chest focus':'chest dip',
 'rear delt fly face pulls':'rear delt fly',
 'rear delt fly machine':'reverse pec deck fly',
 'front raises cable':'cable front raise',
 'db front raise':'dumbbell front raise',
 'machine chest press':'machine chest press',
 'machine row':'seated machine row',
 'straight arm pulldown':'straight arm cable pulldown',
 'skull crushers':'lying barbell tricep extension',
 'seated cable row':'seated cable row',
 'bicycle crunches':'bicycle crunch',
 'hanging leg raises':'hanging leg raise',
 'romanian deadlifts':'barbell romanian deadlift',
 'push ups':'push up'
};
const tidy=str=>String(str||'').toLowerCase().replace(/\([^)]*\)/g,' ').replace(/\s*\/\s*/g,' ').replace(/[-–—]/g,' ').replace(/[^a-z\d ]/g,' ').replace(/\s+/g,' ').trim();
export function canonicalQuery(name){let key=tidy(name);return ALIASES[key]||key.replace(/\blight\b/g,'').replace(/\bdb\b/g,'dumbbell').replace(/\s+/g,' ').trim()}
export function sourceSearchUrl(name){return 'https://www.google.com/search?q='+encodeURIComponent(`site:exrx.net ${canonicalQuery(name)} exercise technique`)}
export function curatedDemo(name){const key=tidy(name),file=COMMONS[key];if(!file)return null;
 return {url:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file),title:name,provider:'Wikimedia Commons',source:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file)};
}
export function demoFor(name,user){if(user?._deleted)return curatedDemo(name);if(user?.url && validDemoUrl(user.url))return user;return curatedDemo(name)}
export function validDemoUrl(url){try{const p=new URL(url);return p.protocol==='https:'&&/\.(gif|webp|png|jpe?g|mp4|webm)(\?|$)/i.test(p.pathname+p.search)&&url.length<2200}catch{return false}}
const gifValid=url=>{try{const u=new URL(url);return u.protocol==='https:'&&u.hostname==='static.exercisedb.dev'&&/^\/media\/[\w-]+\.gif$/i.test(u.pathname)}catch{return false}}
// Prioritize correct equipment/variation. The user confirms the final match.
function score(item,target){
 const n=tidy(item.name), q=tidy(target),a=n.split(' '),b=q.split(' ');
 const stop=new Set(['the','and','a','with','on','to','light','low','high']);
 const x=new Set(a.filter(t=>!stop.has(t))),y=new Set(b.filter(t=>!stop.has(t)));
 let inter=[...y].filter(v=>x.has(v)).length,sim=inter/Math.max(1,y.size);
 if(n===q)sim=2;
 else if(n.includes(q)||q.includes(n))sim+=.3;
 const eq=Array.isArray(item.equipments)?item.equipments.join(' ').toLowerCase():'';
 if(q.includes('dumbbell')&&eq.includes('barbell'))sim-=.65;
 if(q.includes('barbell')&&eq.includes('dumbbell'))sim-=.65;
 if(q.includes('machine')&&eq.includes('body weight'))sim-=.6;
 if(q.includes('incline')&&!n.includes('incline'))sim-=.4;
 if(q.includes('decline')&&!n.includes('decline'))sim-=.5;
 if(q.includes('seated')&&!n.includes('seated'))sim-=.25;
 if(q.includes('lying')&&!n.includes('lying'))sim-=.25;
 return sim;
}
const unique=arr=>[...new Map(arr.map(a=>[a.exerciseId,a])).values()];
function unwrap(json){if(Array.isArray(json))return json;const data=json?.data||json?.results||json?.exercises;return Array.isArray(data)?data:[]}
async function providerFetch(endpoint){
 // First attempt direct access (works on compatible browsers). Some browsers/providers block cross-origin requests.
 try{const r=await fetch('https://oss.exercisedb.dev'+endpoint,{signal:AbortSignal.timeout(9500),mode:'cors',cache:'no-store'});if(r.ok)return await r.json();if(r.status===429)throw new Error('ExerciseDB rate limited')}catch{}
 // Netlify Full Source bundle includes a tiny proxy for sites where CORS is unavailable.
 const r=await fetch('/.netlify/functions/exercise-search?query='+encodeURIComponent(endpoint),{signal:AbortSignal.timeout(11000),cache:'no-store'});
 if(!r.ok)throw new Error('Exercise reference provider unavailable');return await r.json();
}
export async function searchDemos(name){
 if(!navigator.onLine)throw new Error('Offline');
 const query=canonicalQuery(name);
 let results=[];
 // ExerciseDB documents a free no-key listing; the search route may vary by tier and is probed first.
 for(const endpoint of ['/api/v1/exercises/search?search='+encodeURIComponent(query)+'&limit=25','/api/v1/exercises?search='+encodeURIComponent(query)+'&limit=75']){
  try{const res=await providerFetch(endpoint);results.push(...unwrap(res))}catch{}
  if(results.filter(x=>gifValid(x.gifUrl)).length>=5)break;
 }
 let candidates=unique(results).filter(i=>i.name&&gifValid(i.gifUrl)).map(i=>({...i,rank:score(i,query)})).filter(i=>i.rank>.40).sort((a,b)=>b.rank-a.rank).slice(0,12);
 return candidates.map(i=>({name:i.name,gifUrl:i.gifUrl,source:providerDocs,provider,equipment:(i.equipments||[]).join(', ')}));
}
