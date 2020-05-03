import config from './config';
import Utils from './services/Utils';
import Actions from './services/Actions';
// This loads on the entire page, creates the widget iframe, etc

(function () {
  function onDocumentReady() {
    // Utils.resetCookie(Utils.getCookieName());
    if (config.ALWAYS_SHOW && Utils.isClosedCookieExists()) {
      return;
    }

    Utils.createIframe(config.BANNER_HOST_URL + `/${config.WIDGET_FILENAME}`);
    // TODO: Make this configurable
    const iFrameHeight = window.innerWidth < 600 ? '200px' : '145px';

    // Create inline style for the iframe and wrapper
    let style = [
      `#${config.DOM_ID} {`,
      'position: fixed;',
      'right: 0;',
      'left: 0;',
      'bottom: 0;',
      'width: 100%;',
      `height: ${iFrameHeight};`,
      'z-index: 20000;',
      "-webkit-overflow-scrolling: 'touch';",
      'overflow: hidden;',
      '};',
      '',
      `#${config.DOM_ID} iframe {`,
      "width: '100%';",
      "height: '100%';",
      '};',
    ].join(' ');

    Utils.injectCSS(config.DOM_ID + '_CSS', style);

    // listen and manage actions from iframe
    window.addEventListener('message', Actions.receiveMessage);
  }

  // Wait for DOM content to load.
  switch (document.readyState) {
    case 'complete':
    case 'loaded':
    case 'interactive':
      onDocumentReady();
      break;
    default:
      document.addEventListener('DOMContentLoaded', onDocumentReady);
  }
})();
