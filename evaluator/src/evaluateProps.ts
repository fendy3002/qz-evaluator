import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let _number = (data, obj) => {
        return obj["$number"];
    };

    return {
        number: _number
    }
};