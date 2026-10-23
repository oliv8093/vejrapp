// Versioner: hæv tallet, når du ændrer filer
const STATIC_CACHE = "static-v8"
const API_CACHE = "api-v1"

// Statiske filer til offline brug
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/css/site.css",
  "./assets/js/controller/weatherController.js",
  "./assets/js/model/weatherModel.js",
  "./assets/js/view/weatherIcon.js",
  "./assets/js/view/windArrow.js",
  "./assets/js/view/currentWeather.js",
  "./assets/js/view/dayCard.js",
  "./assets/js/view/forecastList.js",
  "./assets/js/view/dayDetail.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
]

// 1. INSTALL: gem de statiske filer i cache
self.addEventListener("install", (event) => {
  console.log("Service worker: install")
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(FILES))
  )
  self.skipWaiting()
})

// 2. ACTIVATE: slet gamle caches
self.addEventListener("activate", (event) => {
  console.log("Service worker: activate")
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== API_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// 3. FETCH
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url)

  // Kun GET-kald caches
  if (event.request.method !== "GET") return

  // API: network first (prøv nettet, ellers brug cache)
  if (url.hostname === "api.open-meteo.com") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Gem en kopi af svaret
          const copy = response.clone()
          caches.open(API_CACHE).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(async () => {
          const cache = await caches.open(API_CACHE)
          // 1. Præcis match
          const exact = await cache.match(event.request)
          if (exact) return exact
          // 2. Ellers det sidst gemte vejr
          const keys = await cache.keys()
          if (keys.length) return cache.match(keys[keys.length - 1])
          // 3. Intet i cachen
          return new Response(JSON.stringify({ error: "offline" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          })
        })
    )
    return
  }

  // Statiske filer: cache first (prøv cache, ellers nettet)
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  )
})