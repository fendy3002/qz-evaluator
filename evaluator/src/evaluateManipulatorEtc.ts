import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let array_handle = (data, obj) => {
        let { source, operation, handler } = obj["$array_handle"];
        let sourceValue = processLogicBlock(data, source);
        let operationMap = {
            map: (sourceValue, handler) => sourceValue.map(each => processLogicBlock({ each, data }, handler)),
            filter: (sourceValue, handler) => sourceValue.filter(each => processLogicBlock({ each, data }, handler)),
            any: (sourceValue, handlerValue) => {
                if (handlerValue) {
                    return sourceValue.some(each => processLogicBlock({ each, data }, handler));
                } else {
                    return sourceValue.length > 0;
                }
            },
        }
        return operationMap[operation](sourceValue, handler)
    };
    let var_length = (data, obj) => {
        let value = processLogicBlock(data, obj["$var_length"]);
        return value.length;
    };

    return {
        array_handle,
        var_length
    };
};