import '../scss/component-specific.scss'

import React, { PropTypes, Component } from 'react';
import { intlShape, injectIntl }       from 'react-intl';
import { messages }                    from './defaultMessages';
import Modal                           from 'react-modal';


class ComponentOwner extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.shape({
      elementId            : PropTypes.string.isRequired,
      successBtnCallBack   : PropTypes.func,
      locale               : PropTypes.string,
      contentTemplateLarge : PropTypes.bool,
      footerVisible        : PropTypes.bool
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen  : false,
      customStyles :{
        overlay : {
          backgroundColor : 'rgba(0, 0, 0, 0.7)',
          maxHeight       : '100%',
          overflow        : 'auto',
          paddingTop      : '15%'
        }
      }
    };

    this.toggleModal         = _toggleModal.bind(this);
    this.renderFooter        = _renderFooter.bind(this);
    this.toggleTemplate      = _toggleTemplate.bind(this);
    this.trapFocus           = _trapFocus.bind(this);
    this.afterOpen           = _afterOpen.bind(this);

  };

  componentWillMount() {

    const { intl, data } = this.props;

    this.setState({
      contentTemplateLarge  : data.contentTemplateLarge,
      footerVisible         : data.footerVisible,
      initiatingButtonText  : intl.formatMessage(messages.initiatingButtonText),
      headerTitle           : intl.formatMessage(messages.headerTitle),
      bodyText              : intl.formatMessage(messages.bodyText),
      closeButtonSRText     : intl.formatMessage(messages.closeButtonSRText),
      toggleTemplate        : this.toggleTemplate(data.contentTemplateLarge),
      renderFooter          : this.renderFooter(data.footerVisible,
                                                intl.formatMessage(messages.modalSaveButtonText),
                                                intl.formatMessage(messages.modalCancelButtonText)
                                               )
    });

  };


  render() {

    const { modalIsOpen,
            toggleTemplate,
            renderFooter,
            customStyles,
            initiatingButtonText,
            headerTitle,
            closeButtonSRText,
            bodyText
          } = this.state;

    return (
      <div>

        <button onClick={this.toggleModal} tabIndex={this.trapFocus(modalIsOpen)} >{initiatingButtonText}</button>

        <Modal
          onRequestClose = {this.toggleModal}
          className      = {toggleTemplate}
          onAfterOpen    = {this.afterOpen}
          isOpen         = {modalIsOpen}
          style          = {customStyles}
          ariaHideApp    = {false}
          role           = "dialog"
        >

          <div id="modalContent" className="modalContent" aria-labelledby="modalContent" role="document">

            <div id="modalHeader" className="modalHeader" aria-labelledby="modalHeader">
              <button className="pe-btn--link pe-icon--times modalClose" onClick={() => this.toggleModal()}>
                <span className="pe-sr-only">{closeButtonSRText}</span>
              </button>
              <h2 id="modalHeaderText" aria-labelledby="modalHeaderText" className="modalHeaderText pe-title">{headerTitle}</h2>
            </div>

            <div id="modalBody" className="modalBody" aria-labelledby="modalBody">
              <p id="modalBodyText">{bodyText}</p>
            </div>

            {renderFooter}

          </div>

        </Modal>
      </div>
    )

  };

};


export default injectIntl(ComponentOwner);




function _toggleModal() {
  this.setState({modalIsOpen : !this.state.modalIsOpen});
};

function _trapFocus(modalIsOpen) {
  return (modalIsOpen) ? '-1' : '0';
};

function _afterOpen() {
  return document.getElementsByClassName('modalClose')[0].focus();
};

function _toggleTemplate(contentTemplateLarge) {
  return (contentTemplateLarge) ? 'pe-template__static-large' : 'pe-template__static-small';
};

function _renderFooter(footerVisible, modalSaveButtonText, modalCancelButtonText) {

  if (footerVisible) {
    const { successBtnCallBack } = this.props.data;
    return(
      <div id="modalFooter" className="modalFooter" aria-labelledby="modalFooter">
        <button onClick={() => successBtnCallBack()} className="modalSave pe-btn pe-btn--primary">{modalSaveButtonText}</button>
        <button onClick={this.toggleModal} className="modalCancel pe-btn">{modalCancelButtonText}</button>
      </div>
    )
  };

};
