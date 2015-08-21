
function string (attr) {
    return {
        attr: attr,
        construct: function (v) {
        	if (typeof v === 'undefined' || v === null) {
        		return null;
        	}
        	return v.toString();
        },
        destruct: function (v) {
            return v;
        }
    };
}


function number (attr) {
    return {
        attr: attr,
        construct: function (v) {
        	if (typeof v === 'number') {
        		return v;
        	} else if (typeof v === 'string') {
        		return parseInt(v);
        	} else if (typeof v === 'boolean') {
                return v ? 1 : 0;
            } else if (typeof v === 'undefined' || v === null) {
        		return null;
        	}

        	throw new Error(attr + ': expected number, got ' + typeof v);
        },
        destruct: function (v) {
            return v;
        }
    };
};


function boolean (attr) {
    return {
        attr: attr,
        construct: function (v) {
        	return !!v;
        },
        destruct: function (v) {
            return v;
        }
    };
};


function array (attr) {
    return {
        attr: attr,
        construct: function (v) {
        	if (v instanceof Array) {
        		return v.slice(0); // clone
        	} else if (typeof v === 'undefined' || v === null) {
                return null;
            }

            throw new Error(attr + ': expected array, got ' + typeof v);
        },
        destruct: function (v) {
            return v;
        }
    };
};


function object (attr) {
	return {
		attr: attr,
		construct: function (v) {
			if (typeof v === 'object') {
				return JSON.parse(JSON.stringify(v));  // clone
			} else if (typeof v === 'undefined' || v === null) {
                return null;
            }

            throw new Error(attr + ': expected object, got ' + typeof v);
		},
		destruct: function (v) {
		    return v;
		}
	}
};


function date (attr, format) {
	var destructor;
	if (!format || format === 'iso8601') {
		destructor = 'toISOString';
	} else {
		throw new Error(attr + ': ' + format + ' is not a valid date format.');
	}

    return {
        attr: attr,
        construct: function (v) {
        	if (typeof v === 'undefined' || v === null) {
        		return null;
        	}

            var d = new Date(v);

            if (isNaN(d.getTime())) {
                throw new Error(attr + ': Invalid Date');
            }

            return new Date(v);
        },
        destruct: function (v) {
            if (!v) {
                return null;
            }
            return v[destructor]();
        }
    };
};


function model (attr, modelClass) {
	if (typeof modelClass !== 'function') {
		// TODO: Check that modelClass is an instance of Model.prototype
		throw new Error(attr + ': Must pass in a model class');
	}

	return {
		attr: attr,
		construct: function (v) {
			if (typeof v === 'undefined' || v === null) {
				return null;
			}
			return new modelClass(v);
		},
		destruct: function (v) {
            if (!v) {
                return null;
            }
		    return v.toJSON();
		}
	}
};


module.exports = {
	string: string,
	number: number,
	boolean: boolean,
	array: array,
	object: object,
	date: date,
	model: model
}