if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js', { scope: './' });
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache').then(cache => {
      return cache.addAll(['./', './assets/src/script.js', './assets/src/style.css']);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    (async function () {
      try {
        const response = await fetch(event.request);
        const cache = await caches.open('cache');
        cache.put(event.request.url, response.clone());
        return response;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});
