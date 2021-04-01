import * as mocha from 'mocha';
import * as evaluateJSON from '../../src/evaluateJSON';
let assert = require('assert');
let moment = require('moment');

mocha.describe('Evaluate Complex: arraymap', function () {
    mocha.it('should evaluate simple addition', async function () {
        let logic = {
            "$m_sum": [
                {
                    "$array_handle": {
                        "source": {
                            "$array": [
                                {
                                    "$number": 5
                                },
                                {
                                    "$number": 7
                                }
                            ]
                        },
                        "operation": "map",
                        "handler": {
                            "$m_two": {
                                "left": {
                                    "$prop_number": "each"
                                },
                                "operation": "plus",
                                "right": {
                                    "$number": 1
                                }
                            }
                        }
                    }
                }
            ]
        };
        let result = evaluateJSON.evaluate({},
            logic
        );
        assert.equal(14, result);
    });

    mocha.it('should evaluate property', async function () {
        let logic = {
            "$m_sum": [
                {
                    "$array_handle": {
                        "source": {
                            "$prop_array": "Sales"
                        },
                        "operation": "map",
                        "handler": {
                            "$prop_number": "each.Value"
                        }
                    }
                }
            ]
        };
        let data = {
            "FirstName": "Brad",
            "LastName": "Gibson",
            "Birth": "1993-07-20",
            "Rank": 3,
            "Sales": [
                {
                    "Month": 0,
                    "Value": 1000
                },
                {
                    "Month": 1,
                    "Value": 1500
                },
                {
                    "Month": 2,
                    "Value": 2000
                },
                {
                    "Month": 3,
                    "Value": 3000
                }
            ]
        };
        let result = evaluateJSON.evaluate(data,
            logic
        );
        assert.equal(7500, result);
    });
});