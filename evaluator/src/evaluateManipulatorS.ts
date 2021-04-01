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
    let s_op_one = (data, obj) => {
        let {
            left,
            operation,
        } = obj["$s_op_one"];
        let leftValue = processLogicBlock(data, left);

        let map = {
            upper: () => leftValue.toUpperCase(),
            lower: () => leftValue.toLowerCase(),
            trim: () => leftValue.trim(),
            trim_end: () => leftValue.trimEnd(),
            trim_start: () => leftValue.trimStart()
        };
        if (!map[operation]) {
            throw new Error(`Operation ${operation} isn't supported`)
        }
        return map[operation]();
    };
    let s_op_two = (data, obj) => {
        let {
            left,
            operation,
            right
        } = obj["$s_op_two"];
        let leftValue = processLogicBlock(data, left);
        let rightValue = processLogicBlock(data, right);

        let map = {
            left: () => leftValue.substring(0, rightValue),
            right: () => leftValue.slice(leftValue.length - rightValue),
            char_at: () => leftValue[rightValue],
        };
        if (!map[operation]) {
            throw new Error(`Operation ${operation} isn't supported`)
        }
        return map[operation]();
    };
    let s_op_three = (data, obj) => {
        let {
            left,
            operation,
            middle,
            right
        } = obj["$s_op_three"];
        let leftValue = processLogicBlock(data, left);
        let middleValue = processLogicBlock(data, middle);
        let rightValue = processLogicBlock(data, right);

        let map = {
            substring: () => leftValue.substring(middleValue, rightValue)
        };
        if (!map[operation]) {
            throw new Error(`Operation ${operation} isn't supported`)
        }
        return map[operation]();
    };
    let s_join = (data, obj) => {
        let {
            delimiter,
            content
        } = obj["$s_join"];
        let source = [];
        for (let each of content) {
            let eachValue = processLogicBlock(data, each);
            if (Array.isArray(eachValue)) {
                source = source.concat(eachValue);
            }
            else {
                source.push(eachValue);
            }
        }
        return source.join(delimiter);
    };

    return {
        s_two,
        s_op_one,
        s_op_two,
        s_op_three,
        s_join
    };
};