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

        internelMethods: ['destroy', 'minimize', 'maximize', 'highlight', 'unhighlight'],

        /***
         * Window initialization method
         * @param  {Object} options
         * @returns void
         */
        init: function (options) {
            this.template = options.template || app.templates.windowTemplate;
            this.id = options.id;
            this.type = options.type || 'normalized'; //minimized or maximized

            this.bindInternalMethods();

            this.render();

            app.events.notify('app:window:created',{id: this.id});
            // app.events.listen('window:' + this.id + ':render', this.render.bind(this));
        },


        /***
         * Binds the events of internal methods
         * @returns void
         */
        bindInternalMethods: function () {
            var view = this;

            this.internelMethods.forEach(function(methodName){
                view[methodName] = view[methodName].bind(view);
            });
        },

        /***
         * Window render
         * @returns void
         */
        render: function () {
            this.wrapper=document.createElement('section');
            this.wrapper.className='window';
            this.wrapper.innerHTML=this.template.join('');
            app.ContentView.el.appendChild(this.wrapper);

            this.closeIcon = this.wrapper.querySelector(this.selectors.closeIcon);
            this.minimizeIcon = this.wrapper.querySelector(this.selectors.minimizeIcon);
            this.maximizeIcon = this.wrapper.querySelector(this.selectors.maximizeIcon);

            this.wrapper.classList.add('windowhighlight');

            this.events.on.call(this);
        },

        /***
         * Window destroy
         * @returns void
         */
        destroy: function () {
            this.events.off.call(this);
            this.wrapper.parentNode.removeChild(this.wrapper);
            console.log('destroy', this.template);

            app.events.notify('app:window:destroy',{id: this.id});
        },

        /***
         * Window minimize
         * @returns void
         */
        minimize: function(){
            this.resetView();

            this.wrapper.classList.add('fadeOutDown');
            this.wrapper.classList.add('animated');

            app.events.notify('app:window:minimized', {
                id: this.id
            });
        },

        /***
         * Window reset- removes the extra styles added in code
         * @returns void
         */
        resetView: function () {
            var view = this;
            this.wrapper.classList.forEach(function(className){
                if(className !== 'window') {
                    view.wrapper.classList.remove(className);
                }
            });
        },

        /***
         * Window popup
         * @returns void
         */
        popup: function(){
            this.resetView();

            this.wrapper.classList.add('fadeInUp');
            this.wrapper.classList.add('animated');

            // app.events.notify('app:window:popup');
        },

        /***
         * Window maximize
         * @returns void
         */
        maximize: function(){
            if(this.type === "maximized"){
                this.wrapper.removeAttribute("style");
                this.type="normalized";
                app.events.notify('app:window:normalized');
            }
            else{
                this.wrapper.style.maxWidth = "100%";
                this.wrapper.style.height = global.innerHeight-70+"px";
                this.type="maximized";
                app.events.notify('app:window:maximized');
            }
        },

        /***
         * Window highlight
         * @param  {EventObject} evnt
         * @returns void
         */
        highlight: function(evnt){
            this.resetView();
            this.popup();
            this.wrapper.classList.add('windowhighlight');
        },

        /***
         * Window unhighlight
         * @param  {EventObject} evnt
         * @returns void
         */
        unhighlight: function(evnt){
            this.minimize();
            // this.wrapper.classList.remove('windowhighlight');
        },

        /***
         * Bind event listeners to view elements
         */
        events: {

            on: function () {
                Events.subscribe(this.closeIcon, 'click', this.destroy);
                Events.subscribe(this.minimizeIcon, 'click', this.minimize);
                Events.subscribe(this.maximizeIcon, 'click', this.maximize);
                app.events.listen('app:footericon:unhighlighted:' + this.id, this.unhighlight);
                app.events.listen('app:footericon:highlighted:' + this.id, this.highlight);

            },

            off: function () {
                Events.unsubscribe(this.closeIcon, 'click', this.destroy);
                Events.unsubscribe(this.minimizeIcon, 'click', this.minimize);
                Events.unsubscribe(this.maximizeIcon, 'click', this.maximize);
                app.events.remove('app:footericon:unhighlighted:' + this.id, this.unhighlight);
                app.events.remove('app:footericon:highlighted:' + this.id, this.highlight);

            }
        },

        /***
         * Elements selectors
         */
        selectors: {
            closeIcon:'.icon-delete-circle',
            minimizeIcon: '.icon-dash',
            maximizeIcon: '.icon-popup'
        }
    };
})(window);
