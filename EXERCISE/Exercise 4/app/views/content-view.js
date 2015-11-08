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
            app.events.listen('app:window:destroy', this.destroyWindow);
        },

        off: function (argument) {

        }
    };

    app.ContentView.createNewWindow = function () {
        console.log(2);
        var windowInstance = Object.create(global.WindowView);
        /**
           * Creates a string that can be used for dynamic id attributes
           * Example: "id-wm68fu1uk63cjtt9"
           * @returns {string}
           */
        windowInstance.init({id: 'id-' + Math.random().toString(36).substr(2, 16)});
        app.windowInstances.push(windowInstance);
    };

    // app.ContentView.selectors={
    //     destroyWindow: '.icon-delete-circle'
    // }

    app.ContentView.destroyWindow = function (evnt) {
        console.log(0);
        // this.parentElement.removeChild(this[i]);
        for (var i = app.windowInstances.length - 1; i >= 0; i--) {
            if(app.windowInstances[i].id === evnt.detail.id){
                app.windowInstances.splice(i,1);
            }
        }

    };


})(window, app);
