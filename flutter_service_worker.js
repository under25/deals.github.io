'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "bf741340abfe71119e226420dca4362c",
"index.html": "c6ba4f659d6fd10b420b935b8fa347ea",
"/": "c6ba4f659d6fd10b420b935b8fa347ea",
"main.dart.js": "5ac7e3c6b00f635c41a62dff5535bc6a",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "52d0db4d12e3cde98f9599ee26869883",
"assets/AssetManifest.json": "04f56d1ded477c04a789519b7ca9115e",
"assets/NOTICES": "06752254054d52e81fed350998ec8c62",
"assets/FontManifest.json": "76d99e603c59054409b289875ac54857",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "b437dd27fde075ce59d0fbfe4e1afabe",
"assets/fonts/Figtree-Bold.ttf": "d979742a2c831a9519cffbb5b22d779d",
"assets/fonts/Figtree-Medium.ttf": "a3757f687685d4561ef80b77afaad515",
"assets/fonts/Figtree-Regular.ttf": "120667cc48d5b8b77c99fab908685023",
"assets/fonts/MaterialIcons-Regular.otf": "52fc34a70b225832e47b13c384bc9b3e",
"assets/assets/images/cred.png": "0e766799b3babed094de1dfc95a06ef4",
"assets/assets/images/swiggyRectangle.png": "dc6755121b398eceb645a8f0588cd999",
"assets/assets/images/myntra.png": "1de78e45397bfc39c982af491b3fbed5",
"assets/assets/images/avatar.png": "b70f2ab17813b14d13ed93210dd63dd9",
"assets/assets/images/submissionUser.png": "b8dfa3099f4fb51a47a45c9835299b56",
"assets/assets/images/logo.png": "c6e2f3f46dfaf7e8279c84e04ebeb1d0",
"assets/assets/images/swiggy.png": "8805ff4a28d9eff807d9c95ac61b7d25",
"assets/assets/images/snapchat.png": "f214cb37e6feaf95dd0e0dcd5923140a",
"assets/assets/icons/home.svg": "3a712c159ef1a71506af969df3ecfabc",
"assets/assets/icons/tasks.svg": "02cc85ef485f977c28eaa7fd571f0bd5",
"assets/assets/icons/logout.svg": "f8f4768241bdd17b04beb66d022740c1",
"assets/assets/icons/ticket.svg": "e24865d6c8e3ac4114897ccd65bd17d9",
"assets/assets/icons/review.svg": "1177f2dc9d211b006b611c4ebedf6501",
"assets/assets/icons/deals.svg": "492bce9603531da131f88cd6a7dd000d",
"assets/assets/icons/settings.svg": "3519a509ff94706c3f53a7bdf5834d7a",
"assets/assets/icons/projects.svg": "17061dc1bca70e45c645bb4a045cdaf7",
"assets/assets/icons/support.svg": "0279dc39ec5b81931127869459e92fe1",
"assets/assets/icons/check.svg": "70090a970bbecd60170b742e230280df",
"assets/assets/icons/email.svg": "e1a844236551aaebe97a5f96c2c50eb6",
"assets/assets/icons/close.svg": "124faeaf0e7e665dd1a951479c5c203c",
"assets/assets/icons/play.svg": "a34530913ab2fbba146b97f0826a8f62",
"assets/assets/icons/media.svg": "d0751eae9e8125736648be19577ded5a",
"assets/assets/icons/credits.svg": "65fc11ee91038127b595752a131ff6d0",
"assets/assets/icons/bbsHeaderLogo.svg": "99567f8a57094aa4421ec71df7fd38e9",
"assets/assets/icons/editRequest.svg": "f797a2282da675968b2c8e7529baa6c8",
"assets/assets/icons/gift.svg": "9f47e745e2a175b2d8e8c885875b33cc",
"assets/assets/icons/money.svg": "847e6bce23a6d83bd6e8aced74fdc9fc",
"assets/assets/icons/submission.svg": "e558c1b5940aa48e548d55443bbd2dfd",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
