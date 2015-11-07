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
     * Bind event listeners to view elements
     */
    app.FooterView.events = {
        on: function () {

            Events.subscribe(this.elements.createNewWindow, 'click', this.createNewWindow.bind(this));
            app.events.listen('app:window:destroy', this.destroyWindow.bind(this));
        },

        off: function () {

        }
    };

    /***
     * Create new Windown object
     */
    app.FooterView.createNewWindow = function () {
        /***
         * TO DO HOMEWORK: add icon for each new window
         */

        this.createNewIcon();
        // app.FooterView.el.firstChild.innerHTML += app.templates.footerTemplate;
        app.events.notify('app:window:create');

    };

    app.FooterView.createNewIcon = function(){
        var wrapper=document.createElement('li');
        wrapper.className='window-tab';
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
        this.el.firstChild.appendChild(wrapper);
    };

    app.FooterView.destroyWindow = function () {
        /***
         * Need to add code to remove icon
         */
         this.wrapper.parentNode.removeChild(this.wrapper);
    };


    /***
     * Store cached elements
     */
    app.FooterView.elements = {

    };
    /***
     * Elements selectors
     */
    app.FooterView.selectors = {
        createNewWindow: '.icon-smile',
        destroyWindow: '.window-tab'
    };

    // app.FooterView.iconcolor= function() {
    //     var letters = '0123456789ABCDEF'.split('');
    //     var color = '#';
    //     for (var i = 0; i < 6; i++ ) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // };

})(window,app);
