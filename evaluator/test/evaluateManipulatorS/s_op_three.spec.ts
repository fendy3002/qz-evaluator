import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator s_op_three', function () {
    mocha.it('should evaluate s_op_three', async function () {
        let result = evaluateJSON.evaluate({}, {
            $s_op_three: {
                left: { $string: "first" },
                operation: "substring",
                middle: { $number: 1 },
                right: { $number: 4 },
            }
        });
        assert.equal("irs", result);
    });
});