import ReactDOM   from 'react-dom';
import React      from 'react';
import  TextModal from '../index.js';


export default class IndexWrapper {

  constructor(config) {
    ReactDOM.render( <TextModal data={config.props} />, document.getElementById(config.elementId) );
  }

}

document.body.addEventListener('o.InitIndex', e => new IndexWrapper(e.detail));
