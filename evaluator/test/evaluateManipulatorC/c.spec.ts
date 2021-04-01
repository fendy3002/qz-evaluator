import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator C', function () {
    mocha.it('should evaluate c_string', async function () {
        let result = evaluateJSON.evaluate({}, {
            $c_string: {
                $number: 50
            }
        });
        assert.strictEqual("50", result);
        assert.notStrictEqual(50, result);
    });
    mocha.it('should evaluate c_number', async function () {
        let result = evaluateJSON.evaluate({}, {
            $c_number: {
                $string: "50"
            }
        });
        assert.strictEqual(50, result);
        assert.notStrictEqual("50", result);
    });
    mocha.it('should evaluate c_string_todate', async function () {
        let result = evaluateJSON.evaluate({}, {
            $c_string_todate: {
                source: { $string: "2020-01-01" },
                format_from: "YYYY-MM-DD"
            }
        });
        assert.equal(true, result instanceof Date);
        assert.equal("2020-01-01", moment(result).format("YYYY-MM-DD"));
    });
    mocha.it('should evaluate c_dateto_string', async function () {
        let result = evaluateJSON.evaluate({}, {
            $c_dateto_string: {
                source: { $date: "2020-01-01" },
                format_to: "YYYY-MM-DD"
            }
        });
        assert.equal("2020-01-01", result);
        assert.equal("string", typeof result);
    });
});