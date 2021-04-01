import * as comparer from './comparer';
import * as manipulator from './manipulator';
import * as array from './array';

let parse = (workspace, objSource) => {
    let top_blocks = workspace.getTopBlocks(false);
    let evaluatorBlock = null;
    for (let i in top_blocks) {
        let top_block = top_blocks[i];
        if (top_block.type == 'evaluator') {
            evaluatorBlock = top_block;
            let connectedBlock = top_block.getInputTargetBlock('json');
            if (connectedBlock) {
                connectedBlock.dispose(false);
            }
        }
        else {
            top_block.dispose(false);
        }
    }
    parser(workspace).obj(evaluatorBlock.getInput("json").connection, objSource);
    workspace.render();
};
let parser = (workspace) => {
    let obj = (parentConnection, objSource) => {
        if (!objSource) {
            return;
        }
        for (let key of Object.keys(objSource)) {
            let blockType = key.substring(1);
            blockLogic[blockType]?.(parentConnection, objSource);
        }
    };

    let string = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('string', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$string"], "string_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let number = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('number', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$number"], "number_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let boolean = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('boolean', true);
        newBlock.initSvg();

        let booleanValue = objSource["$boolean"];
        newBlock.setFieldValue(booleanValue ? "TRUE" : "FALSE", "bool_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let prop_string = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('prop_string', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_string"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let prop_number = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('prop_number', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_number"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let prop_boolean = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('prop_boolean', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_boolean"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let prop_date = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('prop_date', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_date"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let date = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('date', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$date"], "string_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    let blockLogic: any = {};
    blockLogic = {
        string,
        number,
        boolean,
        prop_string,
        prop_number,
        prop_boolean,
        prop_date,
        date,
        ...comparer.populate(workspace, obj),
        ...manipulator.populate(workspace, obj),
        ...array.populate(workspace, obj),
    };

    return {
        obj
    };
};

export {
    parse
};