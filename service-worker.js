"use strict";

const VERSION = 1.01;
let cacheName = 'diceRollerCache';
let filesToCache = [
    './index.html',
    './javascripts/main.js',
    './css/style.css',
    './css/foundation.min.css',
    './favicons/favicon.ico',
    './favicons/android-chrome-192x192.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
        return response;
    }));
});