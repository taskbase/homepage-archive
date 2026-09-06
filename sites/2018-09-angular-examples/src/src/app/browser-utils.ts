export const isInternetExplorer = function() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ') > -1;
  const trident = ua.indexOf('Trident/') > -1;
  return msie || trident;
}
