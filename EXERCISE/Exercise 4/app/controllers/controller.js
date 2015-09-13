/***
 * Base application
 * - create singleton class named app
 * - create init method
 */
var app = app || {};

(function initApplication (global, doc) {

    /**
     * Base app config
     */
    var config = {
        el: '.wrapper'
    },

        /***
         * Cached App elements
         */
        elements = {},
        instanceStorage = [];

    /**
     * Initialize Application
     * @public
     */
    app.init = function () {

        cacheElements();
        this.bindEvents();
        app.events.notify('app:layout:cached');
        app.events.notify('app:ready');
    };

    app.layout = {};

    /***
     * Binds apllication wide events
     */
    app.bindEvents = function () {

        app.events.listen('app:ready', setConfig.bind(this));
        app.events.listen('app:layout:cached', createLayout.bind(this));
    };

    app.windowInstances = [];

    /***
     * Internal application events
     */
    app.events = {

        listen: function (eventName, handler) {

            Events.subscribe(elements.el, eventName, handler);
        },

        notify: function (eventName) {

            Events.publish(elements.el, eventName);
        }
    };

    /**
     * Get config
     * @public
     * returns {Object} config
     */
    app.getConfig = function () {

        return config;
    };

    /**
     * Exit application
     * @public
     * returns void
     */
    app.exit = function () {

        for (var i = instanceStorage.length - 1; i >= 0; i--) {
            instanceStorage[i].destroy();
        };
    };

    /**
     * Create application layout
     */
    function createLayout () {

        for (var templateName in this.templates.layout) {

            app.layout[templateName] = new this[templateName + 'View']({
                template: this.templates.layout[templateName],
                name: templateName
            });

            app.events.notify('view:' + templateName + ':render');
        }
    };

    /**
     * Get user specific configuration
     */
    function setConfig () {

        config.appWidth = global.innerWidth;
        config.appHeight = global.innerHeight;
    }

    /***
     * Cache app main elements
     */
    function cacheElements () {

        elements.el = doc.querySelector(config.el);
    }

})(window, document);