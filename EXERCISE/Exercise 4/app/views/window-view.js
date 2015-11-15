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
           this.type = options.type || 'normalized'; //minimized or maximized

            this.render();

            app.events.notify('app:window:created',{id: this.id});

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

           this.closeIcon = this.wrapper.querySelector(this.selectors.closeIcon);
           this.minimizeIcon = this.wrapper.querySelector(this.selectors.minimizeIcon);
           this.maximizeIcon = this.wrapper.querySelector(this.selectors.maximizeIcon);


           this.events.on.call(this);
        },

        /***
         * Window destroy
         */
        destroy: function () {
            this.wrapper.parentNode.removeChild(this.wrapper);
            console.log('destroy', this.template);

            app.events.notify('app:window:destroy',{id: this.id});
        },

        minimize: function(){
          // this.wrapper.remove('fadeInUp');
          // this.wrapper.remove('animated');

          this.wrapper.classList.add('fadeOutDown');
          this.wrapper.classList.add('animated');

          app.events.notify('app:window:minimized');
        },

        popup: function(){
          // this.wrapper.remove('fadeOutDown');
          // this.wrapper.remove('animated');

          this.wrapper.classList.add('fadeInUp');
          this.wrapper.classList.add('animated');

          app.events.notify('app:window:popup');
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
          for (var i = app.windowInstances.length - 1; i >= 0; i--) {
              if(app.windowInstances[i].id === evnt.detail.id){
                  app.windowInstances[i].wrapper.classList.add('windowhighlight');
                  this.popup();
              }
          }
        },

        events: {

            on: function () {
                Events.subscribe(this.closeIcon, 'click', this.destroy.bind(this));
                Events.subscribe(this.minimizeIcon, 'click', this.minimize.bind(this));
                Events.subscribe(this.maximizeIcon, 'click', this.maximize.bind(this));
                app.events.listen('app:footericon:highlighted', this.highlight.bind(this));
            },

            off: function () {

            }
        },

        selectors: {
            closeIcon:'.icon-delete-circle',
            minimizeIcon: '.icon-dash',
            maximizeIcon: '.icon-popup'
        }
    };
})(window);
