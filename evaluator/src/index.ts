import yaml = require('js-yaml');
import * as types from './types';

let evaluateJson = (data, obj) => {

};
let evaluateJsonArr = (data, obj) => {
    let result = [];
    let index = 1;
    for (let each of data) {
        result.push({
            order: index++,
            data: each,
            evaluation: evaluateJson(each, obj)
        });
    }
    return result;
};
let fromJSON = (logicObj) => {
    return {
        evaluate: (data) => evaluateJson(data, logicObj),
        evaluateArray: (data) => evaluateJsonArr(data, logicObj)
    };
};
let fromYAML = (logicYaml) => {
    let logicObj = yaml.load(logicYaml);
    return {
        evaluate: (data) => evaluateJson(data, logicObj),
        evaluateArray: (data) => evaluateJsonArr(data, logicObj)
    };
};
export const service: types.Service = {
    fromJSON,
    fromYAML,
};
export { types };