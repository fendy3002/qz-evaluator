import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let c_string = (data, obj) => {
        let value = processLogicBlock(data, obj["$c_string"]);
        if (typeof value == "string") {
            return value;
        } else {
            return value.toString();
        }
    };

    let c_number = (data, obj) => {
        let value = processLogicBlock(data, obj["$c_number"]);
        if (typeof value == "number") {
            return value;
        } else if (typeof value == "string") {
            return helper.safeParseFloat(value);
        } else {
            return helper.safeParseFloat(value.toString());
        }
    };
    let c_boolean = (data, obj) => {
        let value = processLogicBlock(data, obj["$c_boolean"]);
        if (typeof value == "boolean") {
            return value;
        } else if (typeof value == "string") {
            return ["true", "1"].indexOf(value.toLowerCase()) >= 0;
        } else {
            return ["true", "1"].indexOf(value.toString().toLowerCase()) >= 0;
        }
    };
    let c_dateto_string = (data, obj) => {
        let { source, format_to } = obj["$c_dateto_string"];
        let sourceValue = processLogicBlock(data, source);
        if (typeof sourceValue == "string") {
            return sourceValue;
        } else if (sourceValue instanceof Date) {
            return moment(sourceValue).format(format_to);
        } else {
            throw new Error(`Type ${typeof sourceValue} not valid for c_dateto_string`)
        }
    };
    let c_string_todate = (data, obj) => {
        let { source, format_from } = obj["$c_string_todate"];
        let sourceValue = processLogicBlock(data, source);
        if (typeof sourceValue == "string") {
            return moment(sourceValue, format_from).toDate();
        } else if (sourceValue instanceof Date) {
            return sourceValue;
        } else {
            throw new Error(`Type ${typeof sourceValue} not valid for c_dateto_string`)
        }
    };
    return {
        c_string,
        c_number,
        c_boolean,
        c_string_todate,
        c_dateto_string
    };
};