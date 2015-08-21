var snowstorm = require('../snowstorm');
var Properties = snowstorm.Properties;

describe('Properties', function() {

    describe('-> string', function () {
        var prop = Properties.string('test');

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        describe('-> construct', function () {
            it('should convert undefined to null', function () {
                expect(prop.construct()).toEqual(null);
            });

            it('should convert null to null', function () {
                expect(prop.construct(null)).toEqual(null);
            });

            it('should convert a string to a string', function () {
                expect(prop.construct('test')).toEqual('test');
            });

            it('should convert a number to a string', function () {
                expect(prop.construct(1)).toEqual('1');
            });

            it('should convert a boolean to a string', function () {
                expect(prop.construct(true)).toEqual('true');
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a string to a string', function () {
                expect(prop.destruct('test')).toEqual('test');
            });
        });
    });

    describe('-> number', function () {
        var prop = Properties.number('test');

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        describe('-> construct', function () {
            it('should convert undefined to null', function () {
                expect(prop.construct()).toEqual(null);
            });

            it('should convert null to null', function () {
                expect(prop.construct(null)).toEqual(null);
            });

            it('should convert a number to a number', function () {
                expect(prop.construct(1)).toEqual(1);
            });

            it('should convert a string to a number', function () {
                expect(prop.construct('1')).toEqual(1);
            });

            it('should convert a boolean to a number', function () {
                expect(prop.construct(false)).toEqual(0);
                expect(prop.construct(true)).toEqual(1);
            });

            it('should throw otherwise', function () {
                expect(function () {
                    prop.construct({});
                }).toThrow(new Error('test: expected number, got object'));
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a number to a number', function () {
                expect(prop.destruct(1)).toEqual(1);
            });
        });
    });

    describe('boolean', function () {
        var prop = Properties.boolean('test');

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        describe('-> construct', function () {
            it('should convert undefined to a boolean', function () {
                expect(prop.construct()).toEqual(false);
            });

            it('should convert null to a boolean', function () {
                expect(prop.construct(null)).toEqual(false);
            });

            it('should convert a boolean to a boolean', function () {
                expect(prop.construct(false)).toEqual(false);
                expect(prop.construct(true)).toEqual(true);
            });

            it('should convert a number to a boolean', function () {
                expect(prop.construct(0)).toEqual(false);
                expect(prop.construct(1)).toEqual(true);
            });

            it('should convert a string to a boolean', function () {
                expect(prop.construct('')).toEqual(false);
                expect(prop.construct('test')).toEqual(true);
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a number to a number', function () {
                expect(prop.destruct(1)).toEqual(1);
            });
        });
    });

    describe('array', function () {
        var prop = Properties.array('test');

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        describe('-> construct', function () {
            it('should convert undefined to null', function () {
                expect(prop.construct()).toEqual(null);
            });

            it('should convert null to null', function () {
                expect(prop.construct(null)).toEqual(null);
            });

            it('should convert an array to an array', function () {
                var arr = [1, 2, 3];
                var result = prop.construct(arr);
                expect(result).toEqual(arr);

                // Test that array was cloned
                arr.push(4);
                expect(result).not.toEqual(arr);
            });

            it('should throw otherwise', function () {
                expect(function () {
                    prop.construct({});
                }).toThrow(new Error('test: expected array, got object'));
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a number to a number', function () {
                expect(prop.destruct(1)).toEqual(1);
            });
        });
    });

    describe('object', function () {
        var prop = Properties.object('test');

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        describe('-> construct', function () {
            it('should convert undefined to null', function () {
                expect(prop.construct()).toEqual(null);
            });

            it('should convert null to null', function () {
                expect(prop.construct(null)).toEqual(null);
            });

            it('should convert an object to an object', function () {
                var obj = {test: 'test'};
                var result = prop.construct(obj);
                expect(result).toEqual(obj);

                // Test that object was cloned
                obj['test2'] = 'test';
                expect(result).not.toEqual(obj);
            });

            it('should throw otherwise', function () {
                expect(function () {
                    prop.construct('not an object');
                }).toThrow(new Error('test: expected object, got string'));
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a number to a number', function () {
                expect(prop.destruct(1)).toEqual(1);
            });
        });
    });

    describe('date', function () {
        var prop = Properties.date('test');
        var dateStr = '1992-05-24T06:00:00.000Z';

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        describe('-> construct', function () {
            it('should convert undefined to null', function () {
                expect(prop.construct()).toEqual(null);
            });

            it('should convert null to null', function () {
                expect(prop.construct(null)).toEqual(null);
            });

            it('should convert an isoformat string to a date', function () {
                var expected = new Date(dateStr);
                expect(prop.construct(dateStr).getTime()).toEqual(expected.getTime());
            });

            it('should throw otherwise', function () {
                expect(function () {
                    prop.construct('this is not a valid date');
                }).toThrow(new Error('test: Invalid Date'));
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a number to a number', function () {
                expect(prop.destruct(new Date(dateStr))).toEqual(dateStr);
            });
        });
    });

    describe('model', function () {
        var aModel = snowstorm.create('model', {test: Properties.string});
        var prop = Properties.model('test', aModel);

        it('should assign the first argument to attr', function () {
            expect(prop.attr).toEqual('test');
        });

        it('should throw if a model class is not provided', function () {
            expect(function () {
                Properties.model('test');
            }).toThrow(new Error('test: Must pass in a model class'));
        });

        describe('-> construct', function () {
            it('should convert undefined to null', function () {
                expect(prop.construct()).toEqual(null);
            });

            it('should convert null to null', function () {
                expect(prop.construct(null)).toEqual(null);
            });

            it('should create a new model instance', function () {
                var obj = prop.construct({test: 'test'});
                expect(obj.test).toEqual('test');
            });
        });

        describe('-> destruct', function () {
            it('should convert null to null', function () {
                expect(prop.destruct(null)).toEqual(null);
            });

            it('should convert a model to JSON', function () {
                expect(prop.destruct(new aModel({test: 'test'}))).toEqual({test: 'test'});
            });
        });
    });
});
