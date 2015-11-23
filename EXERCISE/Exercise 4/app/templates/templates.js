/***
 * Stored templates as plain text
 */
var app = app || {};

(function () {

	app.templates = {

        layout: {

            Content: '<div id="template-Content"></div>',
    		Footer: '<nav class="menu" id="template-Footer"><ul><li class="start"><a href="javascript:;" class="icon-smile"></a></li></ul></nav>'
        },

        windowTemplate: [

            '<header class="header">',
                '<div class="window-actions">',
                    '<span class="action icon-dash"></span>',
                    '<span class="action icon-popup"></span>',
                    '<span class="action icon-delete-circle"></span>',
                '</div>',
                '<h2>Title</h2>',
            '</header>',
            '<div class="pure-g">',
                '<aside class="pure-u-1 pure-u-md-1-5 sidebar">',
                   'Additional actions',
                '</aside>',
                '<main class="pure-u-1 pure-u-md-4-5 content">',
                    'Main content',
                '</main>',
            '</div>',
            '<footer class="footer">',
                '<strong> Status bar :) </strong>',
            '</footer>'],

        footerTemplate:'<a href="#" class="icon-browser"></a>'
	};
})();
