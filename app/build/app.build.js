({
   // main app directory - go up one
   appDir: "../",
   // baseUrl is relative to app directory
   baseUrl: "scripts",
   //build dir
   dir: "../../dist",
   // where is the main require file
   mainConfigFile: "../scripts/main.js",
   // name of module it is loading
   //name: "main",
   modules: [
      {
         name: "main",

         // modules that are not included by main, but may want to front end load as they are commonly used.
         include: [
             "jquery"
         ],

         // Use the *shallow* exclude; otherwise, dependencies of
         // the included modules will also be excluded from this build. 
         // a deep-exclude would override our above include.
         excludeShallow: [
             "aComponent"
         ]
      },

      {
         name: "aComponent",

         // If we don't exclude these modules, they will be doubly
         // defined in our main module (since these are ALSO
         // dependencies of our main module).
         exclude: [
             "jquery"
         ]
      }
   ]
})