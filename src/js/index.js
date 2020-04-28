import config from './config';
import Utils from './services/Utils';
// This loads on the entire page, creates the widget iframe, etc

(function () {
  function onDocumentReady() {
    Utils.createIframe(config.BANNER_HOST_URL + '/widget.html');

    // TODO: Make this configurable?
    const iFrameHeight = window.innerWidth < 600 ? '200px' : '145px';

    // Create inline style for the iframe and wrapper
    const replacer = (key, value) => {
      return value.replace(/[^\w\s]/gi, '');
    };
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

    // listen for messages from iframe
    // window.addEventListener('message', receiveMessage);

    // document.removeEventListener('DOMContentLoaded', initializeInterface);
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
