/* 
  Apple (finally) added support for push notifications by PWAs in iOS 16.4.

  There are some caviats:
  - The app must be installed to iOS as a PWA (Share -> Add to home screen)
  - The notifications must be sent from a service worker through showNotification. 
    new Notification() does not work.
  - The app must be served over HTTPS (so use e.g. localtunnel.me during development)

  Note that ⬆️ is not consistent what is documented on MDN.

  Related links:
  - https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
  - https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  - https://github.com/mdn/browser-compat-data/issues/19318
*/

const isInstalledAsPWA = typeof window !== 'undefined' &&
  !!window.matchMedia('(display-mode: standalone)').matches;

const serviceWorkerSupported =
  typeof navigator !== "undefined" &&
  "serviceWorker" in navigator;

const notificationsSupported = typeof Notification !== "undefined";

let worker = null;
if (serviceWorkerSupported) { 
  navigator.serviceWorker.ready
    .then(w => { worker = w })
    .catch(err => console.error(err));
}

const registerServiceWorker = () => {
  if (!serviceWorkerSupported) {
    return null;
  }
  if (worker) {
    return worker
  }
  return navigator.serviceWorker.register("/sw.js");
}

const requestNotificationPermission = () => notificationsSupported && Notification.requestPermission();
const hasNotificationPermission = () => notificationsSupported && Notification.permission === "granted";

/**
 * Show notification.
 *
 * @param {Object} event - The event object
 * @param {Object} event.title - Title in notification
 * @param {Object} [event.body] - Optional notification body
 */
const showNotification = async ({ title, body }) => {
  if (!isInstalledAsPWA) {
    console.error(`May have to install as PWA first`);
  }
  if (!serviceWorkerSupported || !notificationsSupported) {
    console.error(`Not supported in your browser`)
    return;
  }
  if (!hasNotificationPermission) {
    console.error(`Have no permission to send notifications. Will attempt to request.`);
    await requestNotificationPermission();
  }
  const sw = await registerServiceWorker();
  if (!sw) {
    console.error('Unable to register service worker');
    return;
  }
  await sw.showNotification(title, body ? { body } : undefined);
}

// sendEventToServiceWorker function below is unrelated to
//   notifications, but sends message to the dummy event handler in sw.js
const sendEventToServiceWorker = (data) => {
  postMessage(data);
}