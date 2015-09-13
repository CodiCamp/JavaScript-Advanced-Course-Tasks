/***
 * Window view
 */
var app = app || {};

(function (){

    /***
     * @param {Object} options
     * returns void
     */
    function windowView (options) {

        //Execpional template or default template
        this.template = options.template || app.templates.windowTemplate;
        this.id = options.id;
        this.type = options.type || 'maximized'; //minimized or maximized

        this.render = function () {

            app.layout.content.el.innerHTML += this.template.join('');
        };

        this.destroy = function  () {
            console.log('destroy', this.template);
        };

        this.render();
        // app.events.listen('window:' + this.id + ':render', this.render.bind(this));
    };

    window.windowView = windowView;
})();