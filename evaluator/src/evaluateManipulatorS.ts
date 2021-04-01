import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let s_two = (data, obj) => {
        let {
            left,
            right
        } = obj["$s_two"];
        let leftValue = processLogicBlock(data, left);
        let rightValue = processLogicBlock(data, right);

        let map = {
            "concat": () => leftValue + rightValue,
        };
        return map["concat"]();
    };

    return {
        s_two
    };
};