import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Logic Compare', function () {
    mocha.it('should evaluate gt', async function () {
        let result = evaluateJSON.evaluate({}, {
            $compare: {
                source: { $number: 50 },
                operation: "gt",
                compare: { $number: 10 }
            }
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $compare: {
                source: { $number: 50 },
                operation: "gt",
                compare: { $number: 100 }
            }
        });
        assert.equal(false, result);
    });
    mocha.it('should evaluate date', async function () {
        let result = evaluateJSON.evaluate({}, {
            $compare: {
                source: { $date: "2020-01-02" },
                operation: "gt",
                compare: { $date: "2020-01-01" }
            }
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $compare: {
                source: { $date: "2020-01-01" },
                operation: "eq",
                compare: { $date: "2020-01-01" }
            }
        });
        assert.equal(true, result);
    });
    mocha.it('should evaluate starts_with', async function () {
        let result = evaluateJSON.evaluate({}, {
            $compare: {
                source: { $string: "my_value" },
                operation: "starts_with",
                compare: { $string: "my_val" }
            }
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $compare: {
                source: { $string: "my_value" },
                operation: "starts_with",
                compare: { $string: "my2_val" }
            }
        });
        assert.equal(false, result);
    });
});