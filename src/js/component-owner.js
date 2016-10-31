import '../scss/component-specific.scss';

import React, { PropTypes, Component } from 'react';
import { intlShape, injectIntl }       from 'react-intl';
import { messages }                    from './defaultMessages';
import Modal                           from 'react-modal';


class ComponentOwner extends Component {

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

    this.toggleModal    = _toggleModal.bind(this);
    this.renderFooter   = _renderFooter.bind(this);
    this.toggleTemplate = _toggleTemplate.bind(this);
    this.afterOpen      = _afterOpen.bind(this);

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
                                                intl.formatMessage(messages.modalCancelButtonText),
                                                data.successBtnCallback
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

        <button id="initiatingButton" onClick={this.toggleModal} aria-expanded="false">{initiatingButtonText}</button>

        <Modal
          onRequestClose = {this.toggleModal}
          className      = {toggleTemplate}
          onAfterOpen    = {this.afterOpen}
          isOpen         = {modalIsOpen}
          style          = {customStyles}
          ariaHideApp    = {false}
          role           = "dialog"
        >

          <div id="modalContent" className="modalContent">

            <div id="modalHeader" className="modalHeader">
              <button className="pe-btn--link pe-icon--times modalClose" onClick={() => this.toggleModal()}>
                <span className="pe-sr-only">{closeButtonSRText}</span>
              </button>
              <h2 id="modalHeaderText" className="modalHeaderText pe-title">{headerTitle}</h2>
            </div>

            <div className="modalBody">
              <p>{bodyText}</p>
            </div>

            {renderFooter}

          </div>

        </Modal>
      </div>
    )

  };

};


export default injectIntl(ComponentOwner);




export function _toggleModal() {

  const { modalIsOpen } = this.state;

  document.getElementById('initiatingButton').setAttribute('aria-expanded', !modalIsOpen);

  this.setState({modalIsOpen : !modalIsOpen});
};

export function _afterOpen() {
  document.getElementsByClassName('modalClose')[0].focus();
  document.getElementsByClassName('ReactModal__Content')[0].setAttribute('aria-labelledby', 'modalContent')
};

export function _toggleTemplate(contentTemplateLarge) {
  return (contentTemplateLarge) ? 'pe-template__static-large' : 'pe-template__static-small';
};

export function _renderFooter(footerVisible, modalSaveButtonText, modalCancelButtonText, successBtnCallback) {
  if (footerVisible) {
    return(
      <div id="modalFooter" className="modalFooter">
        <button onClick={() => successBtnCallback()} className="modalSave pe-btn pe-btn--primary">{modalSaveButtonText}</button>
        <button onClick={this.toggleModal} className="modalCancel pe-btn">{modalCancelButtonText}</button>
      </div>
    )
  };

};
