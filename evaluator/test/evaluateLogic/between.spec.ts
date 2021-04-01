import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Logic Between', function () {
    mocha.it('should evaluate between number', async function () {
        let result = evaluateJSON.evaluate({}, {
            $between: {
                min: { $number: 10 },
                source: { $number: 50 },
                max: { $number: 100 }
            }
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $between: {
                min: { $number: 10 },
                source: { $number: 150 },
                max: { $number: 100 }
            }
        });
        assert.equal(false, result);
    });
    mocha.it('should evaluate between date', async function () {
        let result = evaluateJSON.evaluate({}, {
            $between: {
                min: { $date: "2020-01-01" },
                source: { $date: "2020-01-10" },
                max: { $date: "2020-02-01" }
            }
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $between: {
                min: { $date: "2020-01-01" },
                source: { $date: "2020-02-10" },
                max: { $date: "2020-02-01" }
            }
        });
        assert.equal(false, result);
    });
});