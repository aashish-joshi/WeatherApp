const staticCache = 'static-v2';
const dynamicCache = 'dynamic-v1';

const staticCacheList = [
  '/',
  '/about',
  '/main.css',
  '/main.js',
  'favicon.png',
  '/404'
];

// Install the service worker
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticCache).then(cache => {
        //console.log('caching assets');
        cache.addAll(staticCacheList);
      })
    );
  });
  
  // Activate event
  self.addEventListener("activate", activateEvent => {
    //
  });
  
  
  // fetch event
  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request);
      })
    );
  });