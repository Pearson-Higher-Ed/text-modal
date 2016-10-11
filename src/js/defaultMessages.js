import { defineMessages } from 'react-intl';

//
// Default messages are 'en-US'
//
export const messages = defineMessages({
  initiatingButtonText : {
    id             : 'initiatingButtonText',
    description    : 'text in initiating button',
    defaultMessage : 'Open Modal'
  },
  modalSaveButtonText : {
    id             : 'saveButtonText',
    description    : 'text in save button',
    defaultMessage : 'Standard'
  },
  modalCancelButtonText : {
    id             : 'cancelButtonText',
    description    : 'text in cancel button',
    defaultMessage : 'Standard'
  },
  headerTitle : {
    id             : 'headerTitle',
    description    : 'text in header title',
    defaultMessage : 'Basic Title'
  },
  bodyText : {
    id             : 'bodyText',
    description    : 'text in body of modal',
    defaultMessage : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id lorem tellus. Proin a lacus ipsum. Cras scelerisque massa augue, ut efficitur eros dignissim in. Vivamus massa ex, dictum sit amet est at, facilisis venenatis risus. Nullam ipsum diam, ullamcorper ac aliquet sed, sagittis vitae nisi. Curabitur molestie, nisi quis pellentesque interdum, dui sapien finibus justo, vel tempus dolor tortor eu leo. Quisque molestie mi tempus augue consequat porttitor. Proin eget odio sed mi facilisis elementum quis ac elit.'
  },
  closeButtonSRText : {
    id             : 'closeButtonSRText',
    description    : 'close button text for screen reader',
    defaultMessage : 'close modal button'
  }
});
