// Add to cache
self.addEventListener("install", async (event) => {
  try {
    const smashcache = await caches.open("cache1");
    await smashcache.addAll([
      "./", // <- This is for 'index.html'
      "./style.css",
      "./css/common.css",
      "./img/weather-1.svg",
      "./css/bootstrap.min.css",
      "./js/fetch.js",
      './js/addDataToDOM.js',
      './css/animate.min.css',
      './css/aos.css',
      './js/aos.js',
      '/jquery/jquery-3.3.1.slim.min.js',
      './js/bootstrap.min.js',
      './popper/popper.min.js',
      './js/fetchWithCoords.js',
      './js/animate.js',
      './img/weather/cloud.png',
      './img/weather/humidity.png',
      './img/weather/description.png',
      './manifest.webmanifest'
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
                // If not in cache fetch or else get from cache
                return res || fetch(req)
            })
    )
});

// Clear cache
self.addEventListener("activate", async (event) => {
    const cacheKeys = await caches.keys();
    cacheKeys.forEach(key => {
        if(key === 'cache5') caches.delete(key);
    })
})