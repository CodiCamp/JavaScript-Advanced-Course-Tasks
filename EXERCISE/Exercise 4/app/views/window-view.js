/***
 * Window view
 */
 /***
  * @param {Object} options
  * returns void
  */
var app = app || {};

(function(global){

    global.WindowView = {

        /***
         * Generic initialization method
         */
        init: function (options) {
           this.template = options.template || app.templates.windowTemplate;
           this.id = options.id;
           this.type = options.type || 'maximized'; //minimized or maximized

            this.render();

            this.closeIcon=this.wrapper.querySelector('.icon-delete-circle');
            Events.subscribe(this.closeIcon, 'click', this.destroy.bind(this));
            // app.events.listen('window:' + this.id + ':render', this.render.bind(this));
        },

        /***
         * Window render
         */
        render: function () {
           this.wrapper=document.createElement('section');
           this.wrapper.className='window';
           this.wrapper.innerHTML=this.template.join('');
           app.ContentView.el.appendChild(this.wrapper);
        },

        /***
         * Window destroy
         */
        destroy: function () {
            this.wrapper.parentNode.removeChild(this.wrapper);
            console.log('destroy', this.template);

            app.events.notify('app:window:destroy',{id: this.id});
        },

        events: {

            on: function () {

            },

            off: function () {

            }
        },

        selectors: {

        }
    };
})(window);
