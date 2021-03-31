import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator m_two', function () {
    mocha.it('should evaluate m_two', async function () {
        let result = evaluateJSON.evaluate({}, {
            $m_two: {
                left: { $number: 50 },
                operation: "plus",
                right: { $number: 20 },
            }
        });
        assert.equal(70, result);
    });mocha.it('should evaluate m_two mod', async function () {
        let result = evaluateJSON.evaluate({}, {
            $m_two: {
                left: { $number: 10 },
                operation: "mod",
                right: { $number: 3 },
            }
        });
        assert.equal(1, result);
    });
});