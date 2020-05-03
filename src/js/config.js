const baseConfig = {
  NAME: 'WEB_BANNER',
  // DOM_ID: 'WEB_BANNER',
  BANNER_HOST_URL: 'http://localhost:3000/dist/',
  OPEN_LINKS_IN_NEW_TABS: true,
  ALWAYS_SHOW: true,
  COOKIE_EXPIRATION_DAYS: 2,
  WIDGET_FILENAME: 'widget.html',
};

const mergedConfig = Object.assign({}, baseConfig, window.WEB_BANNER_CONFIG);

// Fall back on the name for the DOM_ID
mergedConfig.DOM_ID = mergedConfig.DOM_ID || baseConfig.NAME;

export default mergedConfig;
