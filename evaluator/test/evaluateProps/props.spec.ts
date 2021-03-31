import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Props', function () {
    let data = {
        my_string: "my_string",
        my_number: 256,
        my_string_as_number: "256",
        my_boolean: true,
        my_string_as_boolean: "true",
        my_date: new Date(2021, 0, 1)
    };

    mocha.it('should evaluate string', async function () {
        let result = evaluateJSON.evaluate(data, {
            $prop_string: "my_string"
        });
        assert.equal("my_string", result);
    });
    mocha.it('should evaluate number', async function () {
        let result = evaluateJSON.evaluate(data, {
            $prop_number: "my_number"
        });
        assert.equal(256, result);
        result = evaluateJSON.evaluate(data, {
            $prop_number: "my_string_as_number"
        });
        assert.equal(256, result);
    });
    mocha.it('should evaluate boolean', async function () {
        let result = evaluateJSON.evaluate(data, {
            $prop_boolean: "my_boolean"
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate(data, {
            $prop_boolean: "my_string_as_boolean"
        });
        assert.equal(true, result);
    });

    mocha.it('should evaluate date', async function () {
        let result = evaluateJSON.evaluate(data, {
            $prop_date: "my_date"
        });
        assert.equal("2021-01-01", moment(result).format("YYYY-MM-DD"));
    });
});