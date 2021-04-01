import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Logic ifs', function () {
    mocha.it('should evaluate if', async function () {
        let result = evaluateJSON.evaluate({}, {
            $ifs: {
                cases: [
                    { clause: { $boolean: true }, value: { $number: 10 } }
                ],
                else_value: { $number: 15 }
            }
        });
        assert.equal(10, result);
    });
    mocha.it('should evaluate else if', async function () {
        let result = evaluateJSON.evaluate({}, {
            $ifs: {
                cases: [
                    { clause: { $boolean: false }, value: { $number: 10 } },
                    { clause: { $boolean: true }, value: { $number: 5 } }
                ],
                else_value: { $number: 15 }
            }
        });
        assert.equal(5, result);
    });
    mocha.it('should evaluate else', async function () {
        let result = evaluateJSON.evaluate({}, {
            $ifs: {
                cases: [
                    { clause: { $boolean: false }, value: { $number: 10 } }
                ],
                else_value: { $number: 15 }
            }
        });
        assert.equal(15, result);
    });
});