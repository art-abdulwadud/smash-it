// Add to cache
self.addEventListener("install", async (event) => {
  try {
    const smashcache = await caches.open("cache4");
    await smashcache.addAll([
      "./", // <- This is for 'index.html'
      "./style.css",
      "./css/common.css",
      "./img/weather-1.svg",
      "./css/bootstrap.min.css",
      "./css/animate.min.css",
      "./js/animate.js",
      "./js/fetch.js"
    ]);
    return self.skipWaiting();
  } catch (error) {
    console.log("Files not added to cache");
  }
});

// Fetch
self.addEventListener("fetch", (event) => {
    const req = event.request;
    event.respondWith(
        caches.match(req)
            .then(res => {
                // If not able to fetch, then get from cache
                return fetch(req) || res
            })
    )
});

// Clear cache
self.addEventListener("activate", async (event) => {
    const cacheKeys = await caches.keys();
    cacheKeys.forEach(key => {
        if(key === 'cache3') caches.delete(key);
    })
})