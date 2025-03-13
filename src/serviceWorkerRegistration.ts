// src/serviceWorkerRegistration.ts

// This file registers a service worker for your PWA
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.\d+){0,2}\.\d+$/ // Match 127.0.0.1, 127.0.0.2, etc.
    )
);

export function register(config?: any) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(window.location.href).pathname;
    const swUrl = `${publicUrl}service-worker.js`;

    if (process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }
}
