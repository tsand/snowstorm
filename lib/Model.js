
var Model = function (name, properties, data) {
	this._name = name;
	this._properties = {};

	for (var p in properties) {
	    if (!properties.hasOwnProperty(p) || p.charAt(0) === '_') {
	        continue;
	    }

	    var prop;
	    if (typeof properties[p] === 'function') {
	    	prop = properties[p](p)
	    } else if (typeof properties[p] === 'object') {
	    	prop = properties[p];
	    	if (!prop.attr) {
	    		prop.attr = p;
	    	}
	    }

	    if (!prop || !prop.attr || !prop.construct || !prop.destruct) {
	    	throw new Error(p + ' is not a valid property');
	    }

	    this._properties[p] = prop;
	}

	if (data) {
		this.init(data);
	}
};


Model.prototype.init = function (data) {
	for (var p in this._properties) {
		if (!this._properties.hasOwnProperty(p)) {
			continue;
		}

		var prop = this._properties[p];
		var val = data[prop.attr];
		this[p] = prop.construct(data[prop.attr]);
	}
}


Model.prototype.toString = function () {
    return '[' + this._name + ']';
};


Model.prototype.toJSON = function () {
    var obj = {};

    for (var p in this._properties) {
        if (!this._properties.hasOwnProperty(p)) {
            continue;
        }

        var prop = this._properties[p];
        obj[prop.attr] = prop.destruct(this[p]);
    }

    return obj;
};

module.exports = Model;
