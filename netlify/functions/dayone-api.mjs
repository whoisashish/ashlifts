import { getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';

const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };
const json = (data, status=200) => new Response(JSON.stringify(data), {status,headers:{...headers,'Content-Type':'application/json; charset=utf-8'}});
function authorized(request) {
  const key=process.env.DAYONE_SYNC_KEY;
  if (!key || key.length < 20) return false;
  const provided=(request.headers.get('Authorization')||'').replace(/^Bearer\s+/i,'');
  const a=Buffer.from(provided), b=Buffer.from(key);
  return a.length===b.length && timingSafeEqual(a,b);
}
const fail = () => json({error:'Incorrect sync key or cloud sync is not configured.'},401);
const storage = () => getStore('dayone-private-v2');
export default async (request) => {
  if (!process.env.DAYONE_SYNC_KEY || process.env.DAYONE_SYNC_KEY.length<20) return json({error:'Set DAYONE_SYNC_KEY (20+ characters) in Netlify environment variables and redeploy.'},503);
  if (!authorized(request)) return fail();
  try {
    const url=new URL(request.url);
    const op=url.searchParams.get('op')||'state';
    const store=storage();
    if(op==='state'){
      if(request.method==='GET'){
        const data=await store.get('primary-state',{type:'json'});
        return json({data:data||null});
      }
      if(request.method==='PUT'){
        const len=Number(request.headers.get('content-length')||0);
        if(len>1200000) return json({error:'Backup exceeds the 1.2 MB limit.'},413);
        const text=await request.text();
        if(text.length>1200000) return json({error:'Backup exceeds the 1.2 MB limit.'},413);
        const value=JSON.parse(text);
        if(value?.app!=='DAYONE Gym'||!value?.days||typeof value.days!=='object') return json({error:'Invalid workout log.'},400);
        await store.setJSON('primary-state',value);
        return json({ok:true,updatedAt:new Date().toISOString()});
      }
    }
    if(op==='photo'){
      const day=Number(url.searchParams.get('day'));
      const angle=url.searchParams.get('angle')||'front';
      if(!Number.isInteger(day)||day<1||day>100||!['front','side','back'].includes(angle)) return json({error:'Invalid photo slot.'},400);
      const key=`photos/day-${day}/${angle}.jpg`;
      if(request.method==='GET'){
        const blob=await store.get(key,{type:'arrayBuffer'});
        if(!blob)return json({error:'Photo not found.'},404);
        return new Response(blob,{status:200,headers:{...headers,'Content-Type':'image/jpeg'}});
      }
      if(request.method==='PUT'){
        const len=Number(request.headers.get('content-length')||0);
        if(len>900000)return json({error:'Photo exceeds 900 KB.'},413);
        if(request.headers.get('content-type')!=='image/jpeg')return json({error:'Only optimized JPEG supported.'},415);
        const bytes=await request.arrayBuffer();
        if(bytes.byteLength>900000||bytes.byteLength<100)return json({error:'Photo size is invalid.'},413);
        const check=new Uint8Array(bytes);
        if(check[0]!==255||check[1]!==216)return json({error:'Not a valid JPEG header.'},400);
        await store.set(key,bytes,{metadata:{type:'image/jpeg'}});
        return json({ok:true});
      }
      if(request.method==='DELETE'){
        await store.delete(key);
        return json({ok:true});
      }
    }
    return json({error:'Unsupported method.'},405);
  }catch(error){
    console.error('DAYONE API error:', error?.message);
    return json({error:'Cloud request failed. Retry later.'},500);
  }
};
