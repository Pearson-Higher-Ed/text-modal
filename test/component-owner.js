/* global describe it expect */

import expect              from 'expect';
import expectJSX           from 'expect-jsx';
import React               from 'react';
import {IntlProvider}      from 'react-intl';
import * as ComponentOwner from '../src/js/component-owner';
import { mountWithIntl }   from './utils/intl-enzyme-test-helper.js';

expect.extend(expectJSX);

describe('Component Owner Suite', () => {

  const intlProvider = new IntlProvider({locale: 'en'}, {});
  const {intl}       = intlProvider.getChildContext();
  const targetData   = {
    elementId            : 'test-target',
    contentTemplateLarge : true,
    footerVisible        : true,
    successBtnCallback   : () => { console.log('¡¡success button pressed!!') }
  };
  const wrapper = mountWithIntl(
    <ComponentOwner.default.WrappedComponent data={targetData} intl={intl} />
    , {targetData}
  );


  it('should toggleModal', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.state('modalIsOpen')).toBe(true);
  });

  it('should trapFocus', () => {
    let modalIsOpen = false;
    expect(ComponentOwner._trapFocus(modalIsOpen)).toBe('0');
    modalIsOpen = true;
    expect(ComponentOwner._trapFocus(modalIsOpen)).toBe('-1');
  });

  it('should toggleTemplate', () => {
    let contentTemplateLarge = false;
    expect(ComponentOwner._toggleTemplate(contentTemplateLarge)).toBe('pe-template__static-small');
    contentTemplateLarge = true;
    expect(ComponentOwner._toggleTemplate(contentTemplateLarge)).toBe('pe-template__static-large');
  });

  it('should switch focus afterOpen', () => {
    wrapper.setState({modalIsOpen:true});
    expect(document.getElementsByTagName('button')[0] == document.activeElement).toBe(true);
  });

  // export function _renderFooter(footerVisible, modalSaveButtonText, modalCancelButtonText, successBtnCallback) {
  //   if (footerVisible) {
  //     return(
  //       <div id="modalFooter" className="modalFooter" aria-labelledby="modalFooter">
  //         <button onClick={() => successBtnCallback()} className="modalSave pe-btn pe-btn--primary">{modalSaveButtonText}</button>
  //         <button onClick={this.toggleModal} className="modalCancel pe-btn">{modalCancelButtonText}</button>
  //       </div>
  //     )
  //   };

  it('should render footer conditionally', () => {
    const footerVisible         = true;
    const modalSaveButtonText   = 'save';
    const modalCancelButtonText = 'cancel';
    const successBtnCallback    = () => { console.log('¡¡success button pressed!!') }
    console.log(ComponentOwner._renderFooter(footerVisible, modalSaveButtonText, modalCancelButtonText, successBtnCallback))
    expect(ComponentOwner._renderFooter(footerVisible, modalSaveButtonText, modalCancelButtonText, successBtnCallback)).toEqualJSX(
      <div id="modalFooter" className="modalFooter" aria-labelledby="modalFooter">
        <button onClick={function noRefCheck() {}} className="modalSave pe-btn pe-btn--primary">{modalSaveButtonText}</button>
        <button onClick={undefined} className="modalCancel pe-btn">{modalCancelButtonText}</button>
      </div>
    );
  });


});
