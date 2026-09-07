// MISSING: PUN — offline cache. Bump VERSION whenever index.html changes.
var CACHE_PREFIX='missing-pun-preview-';
var VERSION=CACHE_PREFIX+'estate-8';
var FILES=['./','./index.html','./manifest.webmanifest','./assets/icon-missing-pun-192.png','./assets/icon-missing-pun-512.png','./assets/apple-touch-icon-missing-pun.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){ return Promise.all(keys.filter(function(k){ return k.indexOf(CACHE_PREFIX)===0 && k!==VERSION; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var url=new URL(e.request.url);
  // never cache the multiplayer traffic or fonts; only our own files
  if (url.origin!==self.location.origin) return;
  // network first for the game itself so updates land, cache as the fallback
  e.respondWith(fetch(e.request).then(function(res){
    var copy=res.clone(); caches.open(VERSION).then(function(c){ c.put(e.request, copy); }); return res;
  }).catch(function(){ return caches.open(VERSION).then(function(c){ return c.match(e.request, {ignoreSearch:true}).then(function(r){ return r || c.match('./index.html'); }); }); }));
});
