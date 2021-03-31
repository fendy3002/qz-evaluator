import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator m_op', function () {
    mocha.it('should evaluate m_op_one', async function () {
        let result = evaluateJSON.evaluate({}, {
            $m_op_one: {
                left: { $number: -50 },
                operation: "abs",
            }
        });
        assert.equal(50, result);
        result = evaluateJSON.evaluate({}, {
            $m_op_one: {
                left: { $number: 10.55 },
                operation: "floor",
            }
        });
        assert.equal(10, result);
        result = evaluateJSON.evaluate({}, {
            $m_op_one: {
                left: { $number: 10.55 },
                operation: "ceil",
            }
        });
        assert.equal(11, result);
        result = evaluateJSON.evaluate({}, {
            $m_op_one: {
                left: { $number: 10.55 },
                operation: "round",
            }
        });
        assert.equal(11, result);
    });
    mocha.it('should evaluate m_op_two', async function () {
        let result = evaluateJSON.evaluate({}, {
            $m_op_two: {
                left: { $number: 50 },
                operation: "pow",
                right: { $number: 2 }
            }
        });
        assert.equal(2500, result);
        result = evaluateJSON.evaluate({}, {
            $m_op_two: {
                left: { $number: 50.123456 },
                operation: "round",
                right: { $number: 2 }
            }
        });
        assert.equal(50.12, result);
    });
});