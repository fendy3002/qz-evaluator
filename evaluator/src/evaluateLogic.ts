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
            if (conditionEvaluation) {
                return true;
            }
        }
        return false;
    };
    let ifs = (data, obj) => {
        let {
            cases,
            elseValue
        } = obj["$ifs"];

        for (let eachCase of cases) {
            let clauseEvaluation = processLogicBlock(data, eachCase.clause);
            if (clauseEvaluation) {
                return processLogicBlock(data, eachCase.value);
            }
        }
        return processLogicBlock(data, elseValue);
    };

    let betweenRaw = (operation) => {
        return (data, obj) => {
            let {
                source,
                min,
                max
            } = obj["$" + operation];

            let logic = (k, l, m) => k <= l && l <= m;
            if (operation == "between_ex") {
                logic = (k, l, m) => k < l && l < m;
            }

            let minValue = processLogicBlock(data, min);
            let sourceValue = processLogicBlock(data, source);
            let maxValue = processLogicBlock(data, max);

            if (sourceValue instanceof Date) {
                let minCompare = moment(sourceValue).diff(moment(minValue), "seconds");
                let maxCompare = moment(minValue).diff(moment(sourceValue), "seconds");
                return logic(minCompare, 0, maxCompare);
            }
            else {
                return logic(minValue, sourceValue, maxValue);
            }
        }
    }

    return {
        compare,
        and,
        or,
        ifs,
        between: betweenRaw("between"),
        between_ex: betweenRaw("between_ex"),
    };
};