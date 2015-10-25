/***
 * Content view
 */
var app = app || {};

(function (global){

    /***
     * @param {Object} options
     * returns void
     */
    function contentView (options) {

        this.template = options.template;
        this.name = options.name;
        this.placeholder = document.getElementById('placeholder-' + options.name);


        /***
         * Bind event listeners to view elements
         */
        this.bindEvents = function () {
            app.events.listen('app:window:create', this.createNewWindow);
        };

        this.unbindEvents = function () {

        };

        /***
         * Create new Windown object
         */
        this.createNewWindow = function () {
            console.log(2);
            app.windowInstances.push(new global.windowView({
                /***
                 * TO DO Homework: create UNIQUE ID
                 */
                id: app.windowInstances.length
            }));
        };


        this.render = function () {

            this.placeholder.innerHTML = this.template;
            this.el = document.getElementById('template-' + options.name);

            this.bindEvents();
        };

        this.destroy = function  () {
            console.log('destroy', this.template);
        };

        app.events.listen('view:' + this.name + ':render', this.render.bind(this));
    };

    app.contentView = contentView;
})(window);