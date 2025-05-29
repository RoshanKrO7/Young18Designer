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
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = isLocalhost
      ? '/'
      : '/Young18Designer/';
    
    const swUrl = `${publicUrl}sw.js`;
    
    console.log('Attempting to register service worker at:', swUrl);
    
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  } else {
    console.log('Service Worker not registered: either not in production or not supported');
  }
}
