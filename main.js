import React          from 'react'
import ReactDOM       from 'react-dom'
import ComponentOwner from './src/js/component-owner'
import {IntlProvider} from 'react-intl'

export default class TextModal {

  constructor(config) {

    this.init(config)
  }

  init(config) {

    const locale = config.locale ? config.locale : 'en'

    ReactDOM.render(
      <IntlProvider locale={locale}>
        <ComponentOwner data={config} />
      </IntlProvider>,
      document.getElementById(config.elementId)
    )
  }

}

document.body.addEventListener('o.InitTextModal', e => new TextModal(e.detail))
