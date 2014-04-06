define(function() {
   function App() {
      this._initialise();
   }
   
   App.prototype._initialise = function() {
      console.log('app initialised');
   };
   
   return App;
});