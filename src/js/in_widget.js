// This is code for inside the widget, including translations, managing click events, etc
import '../scss/widget.scss';
import Actions from '../js/services/Actions';
import Utils from '../js/services/Utils';
import config from '../js/config';

function initializeInterface() {
  Utils.attachEvent('.wb-close', 'click', handleCloseButtonClick);
  Utils.attachEvent('.wb-link', 'click', handleLinkClick);
}

function handleCloseButtonClick(event) {
  event.preventDefault();
  event.stopPropagation();
  Actions.postMessage('closeButtonClicked');
  // TODO: Consider re-adding generic analytics tracking
}

function handleLinkClick(event) {
  const linkUrl = event.srcElement
    ? event.srcElement.attributes.href.textContent
    : event.originalTarget.attributes.href.value;

  event.preventDefault();
  event.stopPropagation();
  Actions.postMessage('linkClicked', { linkUrl });
  // TODO: Consider re-adding generic analytics tracking
}

document.addEventListener('DOMContentLoaded', initializeInterface);
