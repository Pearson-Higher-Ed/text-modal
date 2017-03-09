import '../scss/TextModal.scss';

import React, { PropTypes, Component } from 'react';
import Modal                           from 'react-modal';


class TextModal extends Component {

  static propTypes = {
    data: PropTypes.shape({
      successBtnCallback   : PropTypes.func,
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
    this.applyWrapper   = _applyWrapper.bind(this);
    this.removeWrapper  = _removeWrapper.bind(this);

    document.body.addEventListener( 'toggleModal', () => this.setState( { modalIsOpen:!this.state.modalIsOpen } ) );

  };

  componentWillMount() {

    const { data } = this.props;

    this.setState({
      contentTemplateLarge  : data.contentTemplateLarge,
      footerVisible         : data.footerVisible,
      headerTitle           : data.text.headerTitle,
      bodyText              : data.text.bodyText,
      closeButtonSRText     : data.text.closeButtonSRText,
      toggleTemplate        : this.toggleTemplate(data.contentTemplateLarge),
      renderFooter          : this.renderFooter(data.footerVisible,
                                                data.text.modalSaveButtonText,
                                                data.text.modalCancelButtonText,
                                                data.successBtnCallback
                                               )
    });

  };


  render() {

    const {
      modalIsOpen,
      toggleTemplate,
      renderFooter,
      customStyles,
      headerTitle,
      closeButtonSRText,
      bodyText
    } = this.state;

    return (
        <Modal
          onRequestClose = {this.toggleModal}
          className      = {toggleTemplate}
          onAfterOpen    = {this.afterOpen}
          isOpen         = {modalIsOpen}
          style          = {customStyles}
          ariaHideApp    = {false}
          role           = "dialog"
          contentLabel   = "Modal"
  	    >


          <div id="modalContent" className="modalContent" >

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
    )

  };

};


export default TextModal;




export function _toggleModal() {

  const { modalIsOpen } = this.state;

  document.getElementById('initiatingButton').setAttribute('aria-expanded', !modalIsOpen);

  (modalIsOpen) ? this.applyWrapper() : this.removeWrapper();

  this.setState({modalIsOpen : !modalIsOpen});

};


export function _afterOpen() {
  document.getElementsByClassName('modalClose')[0].focus();
  document.getElementsByClassName('ReactModal__Content')[0].setAttribute('aria-labelledby', 'modalContent');
};


export function _applyWrapper() {

  if (!document.getElementById('wrapper')) {

    const wrapper = document.createElement('div');
    wrapper.id    = 'wrapper';
    wrapper.setAttribute('aria-hidden', true);

    const excludedElement = document.getElementsByClassName('ReactModalPortal')[0];

    while (document.body.firstChild !== excludedElement) {
      wrapper.appendChild(document.body.firstChild);
    }

    document.body.appendChild(wrapper);
    document.body.appendChild(excludedElement);
  }

};


export function _removeWrapper() {
  const wrapper         = document.getElementById('wrapper');
  const excludedElement = document.getElementsByClassName('ReactModalPortal')[0];

  while (wrapper.firstChild) {
    document.body.appendChild(wrapper.firstChild);
  }

  document.body.removeChild(wrapper);
  document.body.appendChild(excludedElement);
};


export function _toggleTemplate(contentTemplateLarge) {
  return (contentTemplateLarge) ? 'pe-template__static-large' : 'pe-template__static-small';
};


export function _renderFooter(footerVisible, modalSaveButtonText, modalCancelButtonText, successBtnCallback) {
  if (footerVisible) {
    return(
      <div className="modalFooter" >
        <button onClick={() => successBtnCallback()} className="modalSave pe-btn--primary">{modalSaveButtonText}</button>
        <button onClick={this.toggleModal} className="modalCancel pe-btn">{modalCancelButtonText}</button>
      </div>
    )
  };

};
