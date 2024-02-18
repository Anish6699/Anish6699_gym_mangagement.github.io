'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "f36cf5a55875ab74d0fcaa22466ddb87",
"assets/AssetManifest.bin.json": "cad958d716298376e1dc4c1b62b8d583",
"assets/AssetManifest.json": "43d339636ebbaa408e7c70a8a3830507",
"assets/assets/gym_icon.png": "6553950b3c7dfd126a0aeb862c6d9a23",
"assets/assets/gym_image.png": "5275066950fbfe2fb61a2917decb5770",
"assets/assets/icon/budget.png": "e2e79167b23f112e0409a92fa8eb67e2",
"assets/assets/icon/business-report.png": "42c5013c8c1af7ec4edba0f365c3293b",
"assets/assets/icon/coach.png": "3300003df11e36b7f726aaa56fb56c0d",
"assets/assets/icon/download.png": "8b8eeaf6d2e3264c429556ff36ddc294",
"assets/assets/icon/notification.png": "3e8db9010770d21c53adf87816d7161a",
"assets/assets/icon/people.png": "00c39653c328aca113a5c57030a05875",
"assets/assets/icon/visitors.png": "a96af286805a6883a7831c5e1319f670",
"assets/assets/iconpng.png": "be384825ebe87dfad68da5064dd7a4d1",
"assets/assets/images/bg1.jpg": "05e868d72d99e1e65b25ea3d65292097",
"assets/assets/images/logo.png": "5315be9d0a7602fb12a0ad4c2e3006e9",
"assets/assets/images/mount.png": "aebe437a9af8c95e23c85d8522ec37ef",
"assets/assets/images/person.png": "3b7d6f60e2d450b899c322266fc6edfd",
"assets/assets/logopng.png": "25a7e6049dd32ac5cc3325f7aec4b4c9",
"assets/assets/logoPNG2.png": "c0bef3cebe8956932c021500dfb0d688",
"assets/assets/manGym.png": "7b09fe666ba6396f9e922d37b9481159",
"assets/assets/Search.svg": "396d519c18918ed763d741f4ba90243a",
"assets/assets/svgs/group_gyming.svg": "ad35dc4dd624f0f22624a4e9e6e59280",
"assets/assets/svgs/group_gyming2.svg": "0924ee1257f55afb5a055203bb5d0bd4",
"assets/assets/svgs/group_gyming3.svg": "541f79cbc025bfaac4e95f4648597720",
"assets/assets/svgs/gym_man3.svg": "586fdd75a9015f569c37d64b945784fb",
"assets/assets/svgs/gym_women.svg": "591b481760f1c71172d386554666792c",
"assets/assets/svgs/gym_women2.svg": "2d8b31741913a3ec8d32d8e046f2c7e5",
"assets/assets/svgs/manGym2.svg": "8cdab56be2fdbc9352336c971934a705",
"assets/assets/svgs/streching_men.svg": "8dc71918791a7e45e615a1cb315c5209",
"assets/assets/svgs/streching_women.svg": "6a70c9d58c5c1cb313acd548db89afe3",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "9df4a43e289dfdb98966c094b757cfb9",
"assets/NOTICES": "0ac6605618cda7fc132fefd1f8c7e5e0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "da688f855e6c11426b4279427ad76d5a",
"/": "da688f855e6c11426b4279427ad76d5a",
"main.dart.js": "f32e5de89e517e46ab89d33051b77b9e",
"manifest.json": "ff8a1019548bce0703a125bde264c20a",
"version.json": "7d1e2da4336aa0e47645869695228027"};
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
