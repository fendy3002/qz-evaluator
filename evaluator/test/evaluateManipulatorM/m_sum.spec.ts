import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Manipulator Sum', function () {
    mocha.it('should evaluate sum', async function () {
        let result = evaluateJSON.evaluate({}, {
            $m_sum: [
                { $number: 50 },
                { $number: 30 },
                { $number: 72 }
            ]
        });
        assert.equal(152, result);
    });
});