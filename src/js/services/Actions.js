import config from '../config';
import Utils from './Utils';

class Actions {
  static stopListeningToMessages() {
    window.removeEventListener('message', Actions.receiveMessage);
  }
  /**
   * Post a message form the iframe into the containing window.
   *
   * @param {string} action Action type for the message
   * @param {Object} data Message data
   */
  static postMessage(action, data = {}) {
    data.action = action;
    data[config.NAME] = true;
    window.parent.postMessage(data, '*');
  }
  /**
   * Intercept message from the iframe. In order to work, this needs
   * to be attached to window message event:
   * window.addEventListener('message', receiveMessage)
   *
   * @param {Object} event Event data
   */
  static receiveMessage(event = {}) {
    const bannerUrl = new URL(config.BANNER_HOST_URL);
    if (
      // Verify data is coming from the named banner
      !event.data[config.NAME] ||
      // Verify data is coming from the correct hostname
      event.origin.lastIndexOf(bannerUrl.origin, 0) !== 0
    ) {
      return;
    }

    switch (event.data.action) {
      case 'maximize':
        return Actions.maximize();
      case 'closeButtonClicked':
        return Actions.closeWindow();
      case 'linkClicked':
        if (event.data.linkUrl.lastIndexOf('http', 0) !== 0) return;
        // this.navigateToLink(event.data.linkUrl);
        Actions.navigateToLink(event.data.linkUrl);
    }
  }
  static closeWindow() {
    var wrapper = document.getElementById(config.DOM_ID);
    wrapper.parentNode.removeChild(wrapper);
    Actions.stopListeningToMessages();
    Utils.setCookie(
      Utils.getCookieName(),
      'true',
      parseFloat(config.COOKIE_EXPIRATION_DAYS || 1)
    );
  }

  static navigateToLink(linkUrl) {
    if (config.OPEN_LINKS_IN_NEW_TABS) {
      window.open(linkUrl, '_blank');
    } else {
      document.location = linkUrl;
    }
  }

  static maximize() {
    document.getElementById(config.DOM_ID).style.width = '100%';
    document.getElementById(config.DOM_ID).style.height = '100%';
  }
}

export default Actions;
