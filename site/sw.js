const CACHE='dayone-gym-v2.2';
const CORE=['/','/index.html','/style.css','/app.js','/data.js','/photo-align.js','/exercise-demos.js','/manifest.webmanifest','/course-register.json','/site-settings.json','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',ev=>{ev.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',ev=>{ev.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',ev=>{
 const req=ev.request;
 if(req.method!=='GET'||new URL(req.url).origin!==location.origin||new URL(req.url).pathname.startsWith('/.netlify/functions/'))return;
 ev.respondWith((async()=>{
  if(req.mode==='navigate'){try {const fresh=await fetch(req);const c=await caches.open(CACHE);c.put('/',fresh.clone());return fresh}catch(e){return (await caches.match('/'))||Response.error()}}
  const old=await caches.match(req);
  if(old)return old;
  try{const fresh=await fetch(req);if(fresh.ok){const c=await caches.open(CACHE);c.put(req,fresh.clone())}return fresh}catch(e){return Response.error()}
 })());
});
