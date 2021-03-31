import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    const opEq = (propFrom, propWith) => {
        if (propFrom instanceof Date) {
            return moment(propFrom).isSame(moment(propWith), "day");
        }
        else {
            return propFrom == propWith;
        }
    };
    const opCompare = (propFrom, propWith, operator) => {
        if (propFrom instanceof Date) {
            const secondsDiff = moment(propFrom).diff(moment(propWith), "seconds");
            return operator(secondsDiff, 0);
        }
        else {
            return operator(propFrom, propWith);
        }
    };

    let compare = (data, obj) => {
        let {
            source,
            operation,
            compare
        } = obj["$compare"];
        let sourceValue = processLogicBlock(data, source)
        let compareValue = processLogicBlock(data, compare);
        switch (operation) {
            case "eq":
                return opEq(sourceValue, compareValue);
            case "ne":
                return !opEq(sourceValue, compareValue);
            case "gt":
                return opCompare(sourceValue, compareValue, (k, l) => k > l);
            case "gte":
                return opCompare(sourceValue, compareValue, (k, l) => k >= l);
            case "lt":
                return opCompare(sourceValue, compareValue, (k, l) => k < l);
            case "lte":
                return opCompare(sourceValue, compareValue, (k, l) => k <= l);
            case "starts_with": {
                let sourceStr = (sourceValue as string).toLowerCase()
                let comparerStr = (compareValue as string).toLowerCase()
                return sourceStr.startsWith(comparerStr);
            }
            case "ends_with": {
                let sourceStr = (sourceValue as string).toLowerCase()
                let comparerStr = (compareValue as string).toLowerCase()
                return sourceStr.endsWith(comparerStr);
            }
            case "contains": {
                let sourceStr = (sourceValue as string).toLowerCase()
                let comparerStr = (compareValue as string).toLowerCase()
                return sourceStr.indexOf(comparerStr) >= 0;
            }
            case "regex":
                // to parse regex
                return null;
        }
    };
    let and = (data, obj) => {
        for (let condition of obj["$and"]) {
            let conditionEvaluation = processLogicBlock(data, condition);
            if (!conditionEvaluation) {
                return false;
            }
        }
        return true;
    };
    let or = (data, obj) => {
        for (let condition of obj["$or"]) {
            let conditionEvaluation = processLogicBlock(data, condition);
            if(conditionEvaluation){
                return true;
            }
        }
        return false;
    };

    return {
        compare,
        and,
        or
    };
};