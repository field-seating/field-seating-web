import { isNil } from 'ramda';
import logger from 'lib/logger';

const sendEvent = (eventName, eventParams) => {
  if (isNil(window.gtag)) {
    return;
  }

  window.gtag('event', eventName, eventParams);
  logger.info('event sent', { eventName, eventParams });
};

export const viaMap = {
  spacePhotosFloatingButton: 'spacePhotosFloatingButton',
  bottomNavigationButton: 'bottomNavigationButton',
};

export const clickUploadButton = ({ via }) => {
  if (!viaMap[via]) {
    return;
  }
  sendEvent('click_upload_button', { via });
};

export const uploadPhotos = ({ numOfPhotos }) => {
  sendEvent('upload_photos', { numOfPhotos });
};
