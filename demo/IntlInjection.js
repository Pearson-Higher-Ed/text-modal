import React, { PropTypes, Component } from 'react';
import { intlShape, injectIntl }       from 'react-intl';
import { messages }                    from './translations/defaultMessages';
import TextModal                       from '../index';


class IntlInjection extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.shape({
      elementId            : PropTypes.string.isRequired,
      successBtnCallback   : PropTypes.func,
      locale               : PropTypes.string,
      contentTemplateLarge : PropTypes.bool,
      footerVisible        : PropTypes.bool
    })
  };


  render() {

    const { data, intl } = this.props;

    // do the string replacement...
    const textToPassIn =  {
      headerTitle           : intl.formatMessage(messages.headerTitle),
      bodyText              : intl.formatMessage(messages.bodyText),
      closeButtonSRText     : intl.formatMessage(messages.closeButtonSRText),
      modalSaveButtonText   : intl.formatMessage(messages.modalSaveButtonText),
      modalCancelButtonText : intl.formatMessage(messages.modalCancelButtonText)
    };

    // add text to config data...
    data.text = data.text || textToPassIn;

    return <TextModal data={data} />

  }

}

export default injectIntl(IntlInjection);
