var Model = require('./lib/Model');
var Properties = require('./lib/Properties');


module.exports = {
	create: function (name, properties) {
	    var bindings = [name, properties];

	    function BoundModel() {
	        var args = bindings.concat([].slice.call(arguments));
	        Model.apply(this, args);
	    }
	    BoundModel.prototype = Model.prototype;
	    BoundModel.prototype.constructor = BoundModel;
	    return BoundModel;
	},

	Properties: Properties
}
