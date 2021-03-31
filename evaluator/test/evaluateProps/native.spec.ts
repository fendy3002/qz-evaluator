import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Props Native', function () {
    mocha.it('should evaluate string', async function () {
        let result = evaluateJSON.evaluate({}, {
            $string: "my_value"
        });
        assert.equal("my_value", result);
    });
    mocha.it('should evaluate number', async function () {
        let result = evaluateJSON.evaluate({}, {
            $number: 256
        });
        assert.equal(256, result);
    });
    mocha.it('should evaluate boolean', async function () {
        let result = evaluateJSON.evaluate({}, {
            $boolean: true
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $boolean: false
        });
        assert.equal(false, result);
    });

    mocha.it('should evaluate date', async function () {
        let result = evaluateJSON.evaluate({}, {
            $date: "2021-01-01"
        });
        assert.equal("2021-01-01", moment(result).format("YYYY-MM-DD"));
    });
});