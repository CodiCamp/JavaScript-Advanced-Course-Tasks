/***
 * Footer view
 */
var app = app || {};

(function (global){

    /***
     * @param {Object} options
     * returns void
     */
    function footerView (options) {

        this.template = options.template;
        this.name = options.name;
        this.placeholder = document.getElementById('placeholder-' + options.name);

        /***
         * Elements selectors
         */
        this.selectors = {
            createNewWindow: '.icon-smile'
        };

        /***
         * Store cached elements
         */
        this.elements = {

        };

        /***
         * Bind event listeners to view elements
         */
        this.bindEvents = function () {

            Events.subscribe(this.elements.createNewWindow, 'click', this.createNewWindow);
        };

        this.unbindEvents = function () {

        };

        /***
         * Create new Windown object
         */
        this.createNewWindow = function () {
            /***
             * TO DO HOMEWORK: add icon for each new window
             */
            app.events.notify('app:window:create');
        };


        this.render = function () {

            this.placeholder.innerHTML = this.template;
            this.el = document.getElementById('template-' + options.name);

            this.elements.createNewWindow = this.el.querySelector(this.selectors.createNewWindow);

            this.bindEvents();
        };

        this.destroy = function  () {
            console.log('destroy', this.template);
        };

        app.events.listen('view:' + this.name + ':render', this.render.bind(this));
    };

    app.footerView = footerView;
})(window);