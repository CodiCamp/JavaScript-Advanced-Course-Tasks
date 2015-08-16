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
        setConfig();
        createLayout();
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
        
        for (var template in app.templates) {
            instanceStorage.push(new app.view(app.templates[template]));            
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