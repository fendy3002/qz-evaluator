import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator s_two', function () {
    mocha.it('should evaluate s_two', async function () {
        let result = evaluateJSON.evaluate({}, {
            $s_two: {
                left: { $string: "first" },
                operation: "concat",
                right: { $string: "second" },
            }
        });
        assert.equal("firstsecond", result);
    });
});