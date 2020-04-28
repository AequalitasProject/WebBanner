import config from '../config';

class Utils {
  /**
   * Post a message form the iframe into the containing window.
   *
   * @param {string} action Action type for the message
   * @param {Object} data Message data
   */
  static postMessage(action, data = {}) {
    Object.assign(data, {
      action,
      ACTIVISM_BANNER: true,
    });

    window.parent.postMessage(data, '*');
  }
  /**
   * Intercept message from the iframe. In order to work, this needs
   * to be attached to window message event:
   * window.addEventListener('message', receiveMessage)
   *
   * @param {Object} event Event data
   * @param {Function} callback The callback to evoke if the data
   *  is validated as coming from the widget iframe.
   */
  static receiveMessage(event = {}, callback) {
    if (!event.data.ACTIVISM_BANNER) return false;
    // Verify it is coming from the expected domain
    // if (event.origin.lastIndexOf(iframeHost, 0) !== 0) return

    // switch (event.data.action) {
    // case 'maximize':
    //   return maximize()
    // case 'closeButtonClicked':
    //   return closeWindow()
    // case 'buttonClicked':
    //   if (event.data.linkUrl.lastIndexOf('http', 0) !== 0) return
    //   return navigateToLink(event.data.linkUrl)
    // }
  }

  /**
   * Attaches an event to all nodes that fit the given selector.
   *
   * @param {string} selector A selector for the requested nodes
   * @param {string} event The event to attach the callback to
   * @param {Function} callback A callback for the event
   */
  static attachEventAll(selector, event, callback) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener(event, callback);
    }
  }

  static createIframe(src) {
    var wrapper = document.createElement('div');
    wrapper.id = config.DOM_ID;
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.frameBorder = 0;
    iframe.allowTransparency = true;
    wrapper.appendChild(iframe);
    document.body.appendChild(wrapper);
    iframe.contentWindow.focus();
    return wrapper;
  }

  static injectCSS(id, css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    style.innerHTML = css;
    // if (style.styleSheet) {
    //   style.styleSheet.cssText = css;
    // } else {
    //   style.appendChild(document.createTextNode(css));
    // }

    document.head.appendChild(style);
  }
}

export default Utils;
