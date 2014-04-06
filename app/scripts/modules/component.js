define(['jquery'], function(jQuery) {
   function Component() {
      
   }
   
   Component.prototype.render = function() {
      jQuery(document.body).text('something');
   };
   
   return Component;
})