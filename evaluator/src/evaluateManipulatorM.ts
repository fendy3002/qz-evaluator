import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let m_two = (data, obj) => {
        let {
            left,
            operation,
            right
        } = obj["$m_two"];
        let leftValue = processLogicBlock(data, left);
        let rightValue = processLogicBlock(data, right);

        let map = {
            "plus": () => leftValue + rightValue,
            "minus": () => leftValue - rightValue,
            "divide": () => leftValue / rightValue,
            "multiply": () => leftValue * rightValue,
            "mod": () => leftValue % rightValue,
        };
        return map[operation]();
    };
    let m_op_one = (data, obj) => {
        let {
            left,
            operation,
        } = obj["$m_op_one"];
        let leftValue = processLogicBlock(data, left);

        let map = {
            abs: () => Math.abs(leftValue),
            floor: () => Math.floor(leftValue),
            ceil: () => Math.ceil(leftValue),
            round: () => Math.round(leftValue),
            root: () => Math.sqrt(leftValue),
            log: () => Math.log(leftValue),
        };
        return map[operation]();
    };
    let m_op_two = (data, obj) => {
        let {
            left,
            operation,
            right
        } = obj["$m_op_two"];
        let leftValue = processLogicBlock(data, left);
        let rightValue = processLogicBlock(data, right);

        let map = {
            round: () => leftValue.toFixed(rightValue),
            pow: () => Math.pow(leftValue, rightValue),
            root: () => Math.pow(leftValue, 1 / rightValue),
            log: () => Math.log(leftValue) / Math.log(rightValue)
        };
        return map[operation]();
    };

    return {
        m_two,
        m_op_one,
        m_op_two,
    }
};