import * as yaml from 'js-yaml';
import * as types from './types';
import * as evaluateJSON from './evaluateJSON';

let evaluateJsonArr = (data, obj) => {
    let result = [];
    let index = 1;
    for (let each of data) {
        result.push({
            order: index++,
            data: each,
            evaluation: evaluateJSON.evaluate(each, obj)
        });
    }
    return result;
};
export const fromJSON = (logicObj) => {
    return {
        evaluate: (data) => evaluateJSON.evaluate(data, logicObj),
        evaluateArray: (data) => evaluateJsonArr(data, logicObj)
    };
};
export const fromYAML = (logicYaml) => {
    let logicObj = yaml.load(logicYaml);
    return {
        evaluate: (data) => evaluateJSON.evaluate(data, logicObj),
        evaluateArray: (data) => evaluateJsonArr(data, logicObj)
    };
};
const service: types.Service = {
    fromJSON,
    fromYAML,
};