const CACHE_NAME = "guitar-forge-v1.0.0";
const CORE_ASSETS = [
  "./","./index.html","./style.css","./app.js","./manifest.json",
  "./icons/icon.svg","./offline.html"
];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==="navigate"){
    event.respondWith(fetch(req).then(response=>{
      const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put("./index.html",copy));return response;
    }).catch(()=>caches.match(req).then(hit=>hit||caches.match("./offline.html"))));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>{
    if(cached)return cached;
    return fetch(req).then(response=>{
      if(response&&response.status===200&&response.type==="basic"){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}
      return response;
    }).catch(()=>caches.match("./offline.html"));
  }));
});
