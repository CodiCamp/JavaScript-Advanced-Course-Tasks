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

             /**
                * Creates a string that can be used for dynamic id attributes
                * Example: "id-wm68fu1uk63cjtt9"
                * @returns {string}
                */
             // var uniqueId =

             id: 'id-' + Math.random().toString(36).substr(2, 16)

            // id: 'id' + (new Date()).getTime()
             // app.windowInstances.length
        }));
    };

    // app.ContentView.selectors={
    //     destroyWindow: '.icon-delete-circle'
    // }

    app.ContentView.destroyWindow = function () {
        console.log(0);
        // this.parentElement.removeChild(this[i]);
        app.windowInstances.pop();
    };


})(window, app);
