/***
 * Footer view
 */
var app = app || {};

(function (global,app){
    /***
     * @param {Object} options
     * returns void
     */
    app.FooterView = Object.create(global.BaseView);

    /***
     * FooterView render
     * @returns void
     */
    app.FooterView.render= function () {
        this.placeholder.innerHTML = this.template;
        this.el = document.getElementById('template-' + this.name);
        this.state='highlightedIcon';// highlightedIcon, unhighlightedIcon

        if(this.selectors) {
            // in contentView selectors is undefined; in footer view we have createNewWindow and windowIcon as selectors
            for(var selector in this.selectors) {
                this.elements[selector] = document.querySelector(this.selectors[selector]);
            }
        }

        this.iconList = this.el.firstChild;


        this.events.on.call(this);

    };

    /***
     * Bind event listeners to view elements
     */
    app.FooterView.events = {
        on: function () {

            Events.subscribe(this.elements.createNewWindow, 'click', this.createNewWindow.bind(this));
            app.events.listen('app:window:destroy', this.destroyWindow.bind(this));
            app.events.listen('app:window:created', this.createNewIcon.bind(this));

            // Events.subscribe(this.iconToHighlight,'click', this.iconHighlight.bind(this));
        },

        off: function () {

        }
    };

    /***
     * Create new Window Object
     * @returns void
     */
    app.FooterView.createNewWindow = function () {
        // app.FooterView.el.firstChild.innerHTML += app.templates.footerTemplate;
        this.state='highlightedIcon';
        app.events.notify('app:window:create');

    };

    /***
     * Creates a new icon in footer
     * @param  {EventObject} evnt
     * @return void
     */
    app.FooterView.createNewIcon = function(evnt){
        var wrapper=document.createElement('li');
        wrapper.className='window-tab';
        wrapper.id = evnt.detail.id;
        wrapper.innerHTML=app.templates.footerTemplate;
        var iconcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        // function GetRandomColor() {
        //     var letters = '0123456789ABCDEF'.split('');
        //     var color = '#';
        //     for (var i = 0; i < 6; i++ ) {
        //         color += letters[Math.floor(Math.random() * 16)];
        //     }
        //     return color;
        // }
        // wrapper.firstChild.style.color = GetRandomColor();
        wrapper.firstChild.style.color = iconcolor;
        this.iconList.appendChild(wrapper);
        app.FooterView.footerInstances.push({id: wrapper.id});

        this.resetFooter();

        wrapper.classList.add("iconHighlight");
        Events.subscribe(wrapper, 'click', this.iconHighlight(wrapper));
    };

    /***
     * Creates a new icon in footer
     * @return void
     */
    app.FooterView.resetFooter = function(){
        // var footerview = this.el;
        for (var i = app.FooterView.footerInstances.length - 1; i >= 0; i--) {
            var currentElement = document.getElementById(app.FooterView.footerInstances[i].id);
            currentElement.classList.forEach(function(className){
                if(className !== 'window-tab') {
                    currentElement.classList.remove(className);
                }
            });
        }
    };

    /***
     * Destroys the footer icon of destroyed window
     * @param  {EventObject} evnt
     * @return void
     */
    app.FooterView.destroyWindow = function (evnt) {
        for (var i = app.FooterView.footerInstances.length - 1; i >= 0; i--) {
            if(app.FooterView.footerInstances[i].id === evnt.detail.id){
                app.FooterView.footerInstances.splice(i,1);
            }
        }
        /***
         * Need to add code to remove icon
         */
        var iconToRemove = this.iconList.querySelector('#'+evnt.detail.id);
        Events.unsubscribe(iconToRemove,'click',this.iconHighlight);
        iconToRemove.parentNode.removeChild(iconToRemove);
    };

    /***
     * Highlights the current icon in footer
     * @param  {Object} elm
     * @return void
     */
    app.FooterView.iconHighlight = function (elm) {
        if(elm.classList.contains('iconhighlight')){
            elm.classList.remove('iconhighlight');
            app.events.notify('app:footericon:unhighlighted:' + elm.id);
        }
        else{
            this.resetFooter();
            elm.classList.add('iconhighlight');
            app.events.notify('app:footericon:highlighted:' + elm.id);
        }
    };

    app.FooterView.checkState = function (elm){

    };


    /***
     * Store cached elements
     */
    app.FooterView.elements = {
    };

    app.FooterView.footerInstances = [];

    /***
     * Elements selectors
     */
    app.FooterView.selectors = {
        createNewWindow: '.icon-smile',
        windowIcon: '.window-tab'
    };

})(window,app);
