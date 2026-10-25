/** Optional Netlify proxy for the publicly documented non-commercial ExerciseDB API.
 * Does not copy/rehost exercise media. Routes are restricted to safe lookup endpoints.
 */
export default async (request) => {
  if(request.method!=='GET') return new Response('Method not allowed',{status:405});
  const incoming=new URL(request.url);
  const query=incoming.searchParams.get('query')||'';
  // Prevent SSRF: host and path are not supplied by the client.
  if(query.length>280||!query.startsWith('/api/v1/exercises')||!/^\/api\/v1\/exercises(?:\/search)?\?(?:search|name)=/.test(query))return Response.json({error:'Invalid query'},{status:400});
  const upstream=new URL('https://oss.exercisedb.dev'+query);
  const term=upstream.searchParams.get('search')||upstream.searchParams.get('name')||'';
  if(!term||term.length>90) return Response.json({error:'Invalid search term'},{status:400});
  upstream.searchParams.set('limit',String(Math.min(75,Math.max(1,Number(upstream.searchParams.get('limit'))||25))));
  const abort=new AbortController();const timer=setTimeout(()=>abort.abort(),9000);
  try{
    const r=await fetch(upstream.toString(),{signal:abort.signal,headers:{Accept:'application/json'}});
    if(!r.ok)return Response.json({error:'Exercise source unavailable',upstreamStatus:r.status},{status:r.status===429?429:502,headers:{'Cache-Control':'no-store'}});
    const content=await r.text();if(content.length>500000)throw new Error('Response too large');
    return new Response(content,{status:200,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=600'}});
  }catch{return Response.json({error:'Could not reach reference provider'},{status:502,headers:{'Cache-Control':'no-store'}})}
  finally{clearTimeout(timer)}
};
