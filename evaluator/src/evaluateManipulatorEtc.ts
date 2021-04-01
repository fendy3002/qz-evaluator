import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let array_handle = (data, obj) => {
        let { source, operation, handler } = obj["$array_handle"];
        let operationMap = {
            map: (source, handler) => source.map(handler),
            filter: (source, handler) => source.filter(handler),
            any: (source, handler) => {
                if (handler) {
                    return source.some(handler);
                } else {
                    return source.length > 0;
                }
            },
        }
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