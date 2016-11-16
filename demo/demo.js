import TextModal from '../main'; // to demo direct API usage

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
  new TextModal({
    elementId            : 'app',
    contentTemplateLarge : true,
    footerVisible        : true,
    successBtnCallback   : function () { console.log('¡¡success button pressed!!') }
  });

}


window.onload = init;
