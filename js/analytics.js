// analytics.js
import { analytics } from './firebase-config';

// Google Analytics - log event example
const trackEvent = (eventName, eventParams) => {
  analytics.logEvent(eventName, eventParams);
};

// Export the function to track events
export { trackEvent };
// Google Analytics Setup
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
  ga('create', 'G-JPZTWM3MTP', 'auto');
  ga('send', 'pageview');
  