// analytics.js
import { analytics } from './firebase-config';

// Google Analytics - log event example
const trackEvent = (eventName, eventParams) => {
  analytics.logEvent(eventName, eventParams);
};

// Export the function to track events
export { trackEvent };