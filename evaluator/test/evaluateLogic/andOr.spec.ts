import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Logic and/or', function () {
    mocha.it('should evaluate and', async function () {
        let result = evaluateJSON.evaluate({}, {
            $and: [
                { $boolean: true },
                { $boolean: true },
                { $boolean: true },
            ]
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $and: [
                { $boolean: true },
                { $boolean: false },
                { $boolean: true },
            ]
        });
        assert.equal(false, result);
    });
    mocha.it('should evaluate and from array', async function () {
        let result = evaluateJSON.evaluate({}, {
            $and: [
                {
                    $array: [
                        { $boolean: true },
                        { $boolean: true },
                        { $boolean: true },
                    ]
                },
                { $boolean: true },
            ]
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $and: [
                {
                    $array: [
                        { $boolean: true },
                        { $boolean: false },
                        { $boolean: true },
                    ]
                },
                { $boolean: false },
            ]
        });
        assert.equal(false, result);
    });
    mocha.it('should evaluate or', async function () {
        let result = evaluateJSON.evaluate({}, {
            $or: [
                { $boolean: true },
                { $boolean: false },
                { $boolean: true },
            ]
        });
        assert.equal(true, result);
        result = evaluateJSON.evaluate({}, {
            $or: [
                { $boolean: false },
                { $boolean: false },
                { $boolean: false },
            ]
        });
        assert.equal(false, result);
    });
});