/***
 * Base view
 * - render
 * - destroy
 * - bind events
 * - unbind events
 */
(function(global){

    global.BaseView = {

        /***
         * Generic initialization method
         */
        init: function (options) {
            this.template = options.template;
            this.name = options.name;
            this.placeholder = document.getElementById('placeholder-' + options.name);

            this.render();
        },

        /***
         * Generic render
         */
        render: function () {
            this.placeholder.innerHTML = this.template;
            this.el = document.getElementById('template-' + this.name);

            if(this.selectors) {

                for(var selector in this.selectors) {
                    this.elements[selector] = document.querySelector(this.selectors[selector]);
                }
            }

            this.events.on.call(this);
        },

        /***
         * Generic destroy
         */
        destroy: function () {
            console.log('destroy', this.template);

            this.events.off();
        },

        events: {

            on: function () {

            },

            off: function () {

            }
        }
    };

})(window);