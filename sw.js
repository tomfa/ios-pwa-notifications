/**
 * Dummy service worker event handler
 * @param {MessageEvent<any>} event - The event object
 * @param {Object} event.data - The data sent to the worker.
 */
addEventListener("message", (event) => {
  console.log(`Message received: ${event.data}`);
});
