let CACHE_NAME = "BETTER_WOLRD";
let filesToCache = ['index.html'];

self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME)
         .then((cache) => {
            return cache.addAll(filesToCache)
         })
   )
})

self.addEventListener('fetch', (event) => {
   event.respondWith(
      caches.match(event.request)
         .then(async () => {
            return fetch(event.request)
               .catch(() => caches.match('offline.html'))
         })
   )
})

self.addEventListener('activate', (event) => {
   const cacheWhitelist = [];
   cacheWhitelist.push(CACHE_NAME);

   event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
         cacheNames.map((cacheName) => {
            if(!cacheWhitelist.includes(cacheName)){
               return caches.delete(cacheName)
            }
         })
      ))
   )
})