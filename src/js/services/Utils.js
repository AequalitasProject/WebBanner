import config from '../config';

class Utils {
  /**
   * Attaches an event to all nodes that fit the given selector.
   *
   * @param {string} selector A selector for the requested nodes
   * @param {string} event The event to attach the callback to
   * @param {Function} callback A callback for the event
   */
  static attachEvent(selector, event, callback) {
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
    document.head.appendChild(style);
  }

  static getCookieName() {
    return `_${config.NAME}_CLOSED`;
  }
  static setCookie(name, value, expirationDays) {
    var d = new Date();
    // 86400000 milliseconds per day
    d.setTime(d.getTime() + expirationDays * 86400000);

    var expires = 'expires=' + d.toGMTString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
  }

  static getCookie(cookieName) {
    var name = cookieName + '=';
    var ca = document.cookie.split(';');
    var c;

    for (var i = 0; i < ca.length; i++) {
      c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }
  static resetCookie(name) {
    Utils.setCookie(name, '', -1);
  }
  static isClosedCookieExists() {
    return !!Utils.getCookie(Utils.getCookieName());
  }
}

export default Utils;
