import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let _string = (data, obj) => {
        return obj["$string"];
    };
    let _number = (data, obj) => {
        return obj["$number"];
    };
    let _boolean = (data, obj) => {
        return obj["$boolean"];
    };
    let _array = (data, obj) => {
        return obj["$array"].map(each => {
            return processLogicBlock(data, each);
        });
    };
    let date = (data, obj) => {
        let value = obj["$date"];
        return moment(value).toDate();
    };
    let prop_string = (data, obj) => {
        let value = lo.get(data, obj["$prop_string"]);
        if (typeof value == "string") {
            return value;
        } else {
            return value.toString();
        }
    };
    let prop_number = (data, obj) => {
        let value = lo.get(data, obj["$prop_number"]);
        if (typeof value == "number") {
            return value;
        } else if (typeof value == "string") {
            return helper.safeParseFloat(value);
        } else {
            return helper.safeParseFloat(value.toString());
        }
    };
    let prop_boolean = (data, obj) => {
        let value = lo.get(data, obj["$prop_boolean"]);
        if (typeof value == "boolean") {
            return value;
        } else if (typeof value == "string") {
            return ["true", "1"].indexOf(value.toLowerCase()) >= 0;
        } else {
            return ["true", "1"].indexOf(value.toString().toLowerCase()) >= 0;
        }
    };
    let prop_date = (data, obj) => {
        let value = lo.get(data, obj["$prop_date"]);
        if (typeof value == "object" && value instanceof Date) {
            return value;
        }
        else {
            return moment(value).toDate();
        }
    };
    let prop_array = (data, obj) => {
        let value = lo.get(data, obj["$prop_array"]);
        if (Array.isArray(value)) {
            return value;
        } else {
            return [value];
        }
    };

    return {
        string: _string,
        number: _number,
        boolean: _boolean,
        array: _array,
        date,
        prop_string,
        prop_number,
        prop_boolean,
        prop_date,
        prop_array
    };
};