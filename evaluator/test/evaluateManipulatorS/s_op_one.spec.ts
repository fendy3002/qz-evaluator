import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator s_op_two', function () {
    mocha.it('should evaluate s_op_two', async function () {
        let result = evaluateJSON.evaluate({}, {
            $s_op_one: {
                left: { $string: "first" },
                operation: "upper",
            }
        });
        assert.equal("FIRST", result);
    });
});