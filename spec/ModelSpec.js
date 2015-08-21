var Model = require('../lib/Model');
var Properties = require('../lib/Properties');


describe('Model', function() {

	it('should assign properties to the object', function () {
		var aModel = new Model('test', {
			a: Properties.string
		}, {a: 'test'});

		expect(aModel.a).toEqual('test');
	});

	it('should rename properties with specified attribute', function () {
		var aModel = new Model('test', {
			a: Properties.string('b')
		}, {b: 'test'});

		expect(aModel.a).toEqual('test');
		expect(aModel.b).toBeUndefined();
	});

	it('should have a method toString that returns the model name', function () {
		var aModel = new Model('test', {
			a: Properties.string
		}, {a: 'test'});

		expect(aModel.toString()).toEqual('[test]');
	});

	it('should have a method toJSON that returns a JSON representation of model', function () {
		var aModel = new Model('test', {
			a: Properties.string
		}, {a: 'test'});

		expect(aModel.toJSON()).toEqual({a: 'test'});
	});

});
