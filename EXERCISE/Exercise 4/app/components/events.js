/***
 * Subsciing and Publishing application events
 */
var Events = {

    /***
     * Create event
     * @param {String} eventName
     * @param {Object} eventDetail
     * returns {Event Object}
     */
    create: function(eventName, eventDetail){

        var event = new CustomEvent(eventName, { detail: eventDetail });

        return event;
    },

    /***
     * Subscribes a listener to event and trigger a handler
     * @param {Dom Object} el
     * @param {String} eventName
     * @param {Function} handler
     * @param {Object} params
     * returns void
     */
    subscribe: function (el,eventName,handler) {

        el.addEventListener(eventName,handler,false);
    },

    // elem.addEventListener(eventName, function(e) {
    //        // in the event handler function here, you can directly refer
    //        // to arg1 and arg2 from the parent function arguments
    // }, false);

    // element.addEventListener('click', (function(passedInElement) {
    //     return function(e) {func(e, passedInElement); };
    // }) (this.elements[i]), false);


    /***
     * Publishes an event to the listneres
     * @param {Dom Object} el
     * @param {String} eventName
     * @param {Object} params
     * returns void
     */
    publish: function (el,eventName,params) {

        var evnt = this.create(eventName, params);
        el.dispatchEvent(evnt);

    },

    /***
     * Removes a listener from element and detach handler function
     * @param {Dom Object} el
     * @param {String} eventName
     * @param {Function} handler
     * returns void
     */
    unsubscribe: function (el,eventName,handler) {
        el.removeEventListener(eventName,handler,false);
    }
};
