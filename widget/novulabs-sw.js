/**
 * Service worker for the NovuLabs chat widget's Web Push notifications.
 *
 * Must be hosted on the SAME origin as the page embedding the widget - a
 * browser restriction, not something this file can work around. For local
 * testing that's automatic (served alongside demo.html by the same static
 * server); for a real site, copy this file to the site's own root alongside
 * novulabs-chat-widget.js (see widget/README.md).
 */
self.addEventListener('push', function (event) {
  var data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    /* ignore malformed payload */
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'New message', {
      body: data.body || '',
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
