import mixpanel from 'mixpanel-browser';
 
const MIXPANEL_TOKEN = "1c59aab610b3c458ee7a7ef725b0bb5b";
 
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }
 
  mixpanel.init(MIXPANEL_TOKEN, { autocapture: true });
}
