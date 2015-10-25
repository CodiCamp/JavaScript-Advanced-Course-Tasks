/***
 * Content view
 */
var app = app || {};

(function (global, app){

    /***
     * @param {Object} options
     * returns void
     */
    app.ContentView = Object.create(global.BaseView);

    app.ContentView.events = {
        on: function () {
            app.events.listen('app:window:create', this.createNewWindow);
        },

        off: function (argument) {

        }
    };

    app.ContentView.createNewWindow = function () {
        console.log(2);
        app.windowInstances.push(new global.windowView({
            /***
             * TO DO Homework: create UNIQUE ID
             */
            id: app.windowInstances.length
        }));
    };


})(window, app);