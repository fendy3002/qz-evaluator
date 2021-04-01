import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator s_op_two', function () {
    mocha.it('should evaluate s_op_two', async function () {
        let result = evaluateJSON.evaluate({}, {
            $s_op_two: {
                left: { $string: "first" },
                operation: "left",
                right: { $number: 2 },
            }
        });
        assert.equal("fi", result);
    });
});