import * as comparer from './comparer';
import * as manipulator from './manipulator';
import * as array from './array';

import * as helper from './helper';
let jsonify = (workspace) => {
    let top_blocks = workspace.getTopBlocks(false);
    for (let i in top_blocks) {
        let top_block = top_blocks[i];
        if (top_block.type == 'evaluator') {
            return evaluator(top_block);
        }
    }
    return {};
};

let evaluator = (block) => {
    let inputTargetBlock = block.getInputTargetBlock('json');
    if (inputTargetBlock) {
        let evaluated = processBlock(inputTargetBlock);
        return evaluated;
    }
    return {};
};
let string = (block) => {
    let string_value = block.getFieldValue('string_value');
    return { $string: string_value };
};
let number = (block) => {
    let number_value = Number(block.getFieldValue('number_value'));
    return { $number: helper.safeParseFloat(number_value) };
};
let boolean = (block) => {
    let bool_value = block.getFieldValue('bool_value');
    return bool_value === "TRUE" ? { $boolean: true } : { $boolean: false };
};
let prop_string = (block) => {
    let prop_name = block.getFieldValue('prop_name');
    return { $prop_string: prop_name };
};
let prop_number = (block) => {
    let prop_name = block.getFieldValue('prop_name');
    return { $prop_number: prop_name };
};
let prop_boolean = (block) => {
    let prop_name = block.getFieldValue('prop_name');
    return { $prop_boolean: prop_name };
};
let prop_date = (block) => {
    let prop_name = block.getFieldValue('prop_name');
    return { $prop_date: prop_name };
};
let date = (block) => {
    let string_value = block.getFieldValue('string_value');
    return { $date: string_value };
};
let blockLogic: any = {};
let processBlock = (block) => {
    if (block && blockLogic[block.type]) {
        return blockLogic[block.type](block);
    }
    else {
        return null;
    }
}
blockLogic = {
    evaluator,
    string,
    number,
    boolean,
    prop_string,
    prop_number,
    prop_boolean,
    prop_date,
    date,
    ...comparer.populate(processBlock),
    ...manipulator.populate(processBlock),
    ...array.populate(processBlock),
};


export { jsonify };