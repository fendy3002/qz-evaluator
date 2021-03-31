import * as lo from 'lodash';
import * as moment from 'moment';
import * as helper from './helper';
import * as types from './types';

export default (processLogicBlock: types.ProcessLogicBlock) => {
    let compare = (data, obj) => {
        let {} = obj["$compare"];
    };

    return {
        compare
    };
};