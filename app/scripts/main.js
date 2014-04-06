require.config({
   paths: {
      "jquery": "vendor/jquery/dist/jquery",
      "aComponent": "modules/component"
   }
})

require(['app'], function(App) {
   // TODO - app dynamically get its modules
   (new App());
   
   // TODO - only required here to demonstrate lazy loading
   require(['aComponent'], function(aComponent) {
      (new aComponent()).render();
   });
});