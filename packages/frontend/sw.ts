/// <reference lib="webworker" />

const CACHE_NAME = 'manifest-cache'
const URLS_TO_CACHE = ['/', '/index.html', '/favicon.ico', '/public']

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE)
    })
  )
})

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
