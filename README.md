## iOS PWA notifications demo

Minimal demo for demonstrating iOS notifications with PWA.

Try visiting [https://ios.webutvikling.org](https://ios.webutvikling.org) with your phone.

### Context

Apple (finally) added support for push notifications by PWAs in iOS 16.4.

#### There are some caviats:

- The app must be installed to iOS as a PWA (Share -> Add to home screen)
- The notifications must be sent from a service worker through `worker.showNotification`.
  `new Notification()` does not seem to work.
- The app must be served over HTTPS (so use e.g. localtunnel.me during development)

Note that ⬆️ is not consistent what is documented on MDN.

#### Related links:

- https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
- https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
- https://github.com/mdn/browser-compat-data/issues/19318
