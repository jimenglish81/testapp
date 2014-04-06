require.config({
	paths: {
		"jquery": "vendor/jquery/dist/jquery"
	}
})

require(['app'], function(App) {
	// TODO - app dynamically get its modules
	(new App());
});