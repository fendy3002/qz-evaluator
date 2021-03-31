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
});