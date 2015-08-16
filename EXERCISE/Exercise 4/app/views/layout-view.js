/***
 * Layout view
 */
var app = app || {};

(function (){

    /***
     * @param {Object} options
     * returns void
     */
    function layoutView (options) {

        this.template = options.template;
        this.name = options.name;
        this.placeholder = document.getElementById('placeholder-' + options.name);




        this.render = function () {

            this.placeholder.innerHTML = this.template;
            this.el = document.getElementById('template-' + options.name)
        };

        this.destroy = function  () {
            console.log('destroy', this.template);
        };

        app.events.listen('view:' + this.name + ':render', this.render.bind(this));
    };

    app.layoutView = layoutView;
})();