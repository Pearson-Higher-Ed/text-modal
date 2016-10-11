# textModal

## Summary

Modal for displaying text....

## Getting started

To view the demo:

clone the repo.

install the dependencies.

`npm i`

start the server.

`npm run dev`

access in the browser:

`http://localhost:8081/demo/#`


In demo/demo.js you may pass configuration parameter when instantiating the object.
The three parameters that you can configure are:
elementId, contentTemplateLarge, footerVisible

// element to render component to... in this case 'app'

elementId            : 'app'

// apply pe-template__static-large or pe-template__static-small... in the case below pe-template__static-large

contentTemplateLarge : true  

// render the footer... in the case below the footer is visible

footerVisible        : true   

All text is configured in src/js/defaultMessages.js
