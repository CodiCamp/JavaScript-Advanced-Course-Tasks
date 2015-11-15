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

        internelMethods: ['destroy', 'minimize', 'maximize', 'highlight'],

        /***
         * Generic initialization method
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

        bindInternalMethods: function () {
            var view = this;

            this.internelMethods.forEach(function(methodName){
                view[methodName] = view[methodName].bind(view);
            });
        },

        /***
         * Window render
         */
        render: function () {
            this.wrapper=document.createElement('section');
            this.wrapper.className='window';
            this.wrapper.innerHTML=this.template.join('');
            app.ContentView.el.appendChild(this.wrapper);

            this.closeIcon = this.wrapper.querySelector(this.selectors.closeIcon);
            this.minimizeIcon = this.wrapper.querySelector(this.selectors.minimizeIcon);
            this.maximizeIcon = this.wrapper.querySelector(this.selectors.maximizeIcon);


            this.events.on.call(this);
        },

        /***
         * Window destroy
         */
        destroy: function () {
            this.events.off.call(this);
            this.wrapper.parentNode.removeChild(this.wrapper);
            console.log('destroy', this.template);

            app.events.notify('app:window:destroy',{id: this.id});
        },

        minimize: function(){
            this.resetView();

            this.wrapper.classList.add('fadeOutDown');
            this.wrapper.classList.add('animated');

            app.events.notify('app:window:minimized');
        },

        resetView: function () {
            var view = this;
            this.wrapper.classList.forEach(function(className){
                if(className !== 'window') {
                    view.wrapper.classList.remove(className);
                }
            });
        },

        popup: function(){
            this.resetView();

            this.wrapper.classList.add('fadeInUp');
            this.wrapper.classList.add('animated');

            // app.events.notify('app:window:popup');
        },

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

        highlight: function(evnt){
            this.wrapper.classList.add('windowhighlight');
        },

        events: {

            on: function () {
                Events.subscribe(this.closeIcon, 'click', this.destroy);
                Events.subscribe(this.minimizeIcon, 'click', this.minimize);
                Events.subscribe(this.maximizeIcon, 'click', this.maximize);
                app.events.listen('app:footericon:highlighted:' + this.id, this.highlight);
            },

            off: function () {
                Events.unsubscribe(this.closeIcon, 'click', this.destroy);
                Events.unsubscribe(this.minimizeIcon, 'click', this.minimize);
                Events.unsubscribe(this.maximizeIcon, 'click', this.maximize);
                app.events.remove('app:footericon:highlighted:' + this.id, this.highlight);
            }
        },

        selectors: {
            closeIcon:'.icon-delete-circle',
            minimizeIcon: '.icon-dash',
            maximizeIcon: '.icon-popup'
        }
    };
})(window);
