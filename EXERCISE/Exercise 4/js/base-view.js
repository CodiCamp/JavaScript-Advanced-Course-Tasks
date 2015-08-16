/***
 * Base view
 */
var app = app || {};

(function (){
    /***
     * @param {String} template
     * returns void
     */
    function baseView (template) {
        
        this.template = template;

        console.log('base view inited');
        
        this.destroy = function  () {
            console.log('destroy', this.template);
        };
    };

    app.view = baseView;
})();