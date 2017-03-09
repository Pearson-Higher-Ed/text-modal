import React          from 'react';
import ReactDOM       from 'react-dom';
import IntlInjection  from './IntlInjection';
import {IntlProvider} from 'react-intl'

class TextModalWrapper {

  constructor(config) {
    this.init(config)
  }

  init(config) {

    const locale = config.locale ? config.locale : 'en'

    ReactDOM.render(
      <IntlProvider locale={locale}>
        <IntlInjection data={config} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    )
  }

}


function init() {

  // Demo eventing API
  document.body.dispatchEvent(new CustomEvent('o.InitTextModal', {
    detail: {
      elementId            : 'app',
      contentTemplateLarge : true,
      footerVisible        : true,
      successBtnCallback   : function () { console.log('¡¡success button pressed!!') }
    }
  }));

  // Demo direct API
  new TextModalWrapper({
    elementId            : 'app',
    contentTemplateLarge : true,
    footerVisible        : true,
    successBtnCallback   : function () { console.log('¡¡success button pressed!!') }
  });

}


window.onload = init;
