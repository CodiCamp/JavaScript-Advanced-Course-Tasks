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

            Events.subscribe(this.elements.createNewWindow, 'click', this.createNewWindow);
        }
    };

    /***
     * Create new Windown object
     */
    app.FooterView.createNewWindow = function () {
        /***
         * TO DO HOMEWORK: add icon for each new window
         */
        app.events.notify('app:window:create');
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
        createNewWindow: '.icon-smile'
    };
})(window,app);