import React          from 'react';
import ReactDOM       from 'react-dom';
import ComponentOwner from './src/js/component-owner';
import frLocaleData   from 'react-intl/locale-data/fr';
import frJson         from './translations/fr.json';
import {addLocaleData, IntlProvider} from 'react-intl';

const translations = { 'fr' : frJson };

export default class TextModal {

  constructor(config) {

    addLocaleData(frLocaleData);
    this.init(config);
  }

  init(config) {

    const locale = config.locale ? config.locale : 'en';

    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <ComponentOwner data={config} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }

}


document.body.addEventListener('o.InitTextModal', e => new TextModal(e.detail));
