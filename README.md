# Text Modal

## Summary

This component is a simple modal dialog which displays a header, simple set of text (possibly with run-something and cancel buttons) and optionally a footer.

## Getting started

To view the demo:

* clone the repo.
* install the dependencies:

  `npm i`
* start the server:

  `npm start`
* access in the browser:

  `http://localhost:8081/demo/#`


In `demo/demo.js` you may pass configuration parameter when instantiating the object.
The three parameters that you can configure are:
* elementId
* contentTemplateLarge
* footerVisible

### elementID

A string representing the id of the element the component is rendered to. Required.

`elementId            : 'app'`

`<div id="app"></div>`

### contentTemplateLarge

A boolean. When set to `true`, the `pe-template__static-large` class is applied. When `false`, the `pe-template__static-small` class is applied.

`contentTemplateLarge : true`

### footerVisible

A boolean. `true` renders a footer.

`footerVisible        : true`

All text is configured in src/js/defaultMessages.js

## Polyfills

As shown on the `demo.js` page, one option for running this component is with the eventing API, which uses `CustomEvent`.  `CustomEvent` isn't supported in IE and needs a polyfill:
 
```
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=CustomEvent</script>
```

In addition, this component uses React Intl which relies on the <a href="http://www.ecma-international.org/ecma-402/1.0/">ECMAScript Internationalization API</a>. This API was not supported in Safari browser until version 10. If you're supporting older version of Safari, this polyfill is needed, with mentions for each language you are supporting (example below supports English, French):

```
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=Intl.~locale.en,Intl.~locale.fr"></script>
```

The demo's HTML page combines these:

```
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=CustomEvent,Intl.~locale.en,Intl.~locale.fr"></script>
```

Be sure to add whichever polyfills you need to the page rendering this component.
