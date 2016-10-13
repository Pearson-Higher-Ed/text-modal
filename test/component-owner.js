/* global describe it expect */

import expect              from 'expect';
import React               from 'react';
import {IntlProvider}      from 'react-intl';
import * as ComponentOwner from '../src/js/component-owner';
import { mountWithIntl }   from './utils/intl-enzyme-test-helper.js';


describe('Component Owner Suite', () => {

  let intlProvider = new IntlProvider({locale: 'en'}, {});

  const {intl}       = intlProvider.getChildContext();
  const targetData   = {
    elementId            : 'test-target',
    contentTemplateLarge : true,
    footerVisible        : true,
    successBtnCallback   : () => { console.log('¡¡success button pressed!!') }
  };


  it('should toggleModal', () => {

    const wrapper = mountWithIntl(
      <ComponentOwner.default.WrappedComponent data={targetData} intl={intl} />
      , {targetData}
    );
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

  // it('should trap focus', () =>{
  //
  // });
  //
  // it('should', () =>{
  //
  // });



});
