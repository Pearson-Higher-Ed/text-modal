import ReactDOM           from 'react-dom';
import React              from 'react'
import  * as Index        from '../index.js'


export default class IndexWrapper {

  constructor(config) {

    this.init(config);

  }

  init(config) {

    const reactElement = React.createElement(config.componentName, config.props, config.props.children)

    ReactDOM.render( reactElement, document.getElementById(config.elementId) );
  }

}

document.body.addEventListener('o.InitTextIndex', e => new IndexWrapper(e.detail))