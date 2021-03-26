
let parse = (workspace, objSource) => {
    workspace.clear();

    let evaluatorBlock = workspace.newBlock('evaluator');
    evaluatorBlock.initSvg();

    parser(workspace).obj(evaluatorBlock, objSource);

    workspace.render();
};
let parser = (workspace) => {
    let obj = (block, objSource) => {
        for (let key of Object.keys(objSource)) {
            let prop = objSource[key];
            if (key == "$string") {
                string(block, objSource);
            }
            else if (key == "$number") {
                number(block, objSource);
            }
        }
    };
    let string = (block, objSource) => {
        let newBlock = workspace.newBlock('string', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$string"], "string_value");
        let newBlockOutput = block.outputConnection;
        newBlockOutput.connect(block);
    };
    let number = (block, objSource) => {
        let newBlock = workspace.newBlock('number', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$number"], "number_value");
        let newBlockOutput = block.outputConnection;
        newBlockOutput.connect(block);
    };
    let boolean = (block, objSource) => {
        let newBlock = workspace.newBlock('boolean', true);
        newBlock.initSvg();

        let booleanValue = objSource["$boolean"];
        newBlock.setFieldValue(booleanValue ? "TRUE" : "FALSE", "bool_value");
        let newBlockOutput = block.outputConnection;
        newBlockOutput.connect(block);
    };
    let prop_string = (block, objSource) => {
        let newBlock = workspace.newBlock('prop_string', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_string"], "prop_name");
        let newBlockOutput = block.outputConnection;
        newBlockOutput.connect(block);
    };
    let prop_number = (block, objSource) => {
        let newBlock = workspace.newBlock('prop_number', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_number"], "prop_name");
        let newBlockOutput = block.outputConnection;
        newBlockOutput.connect(block);
    };
    let prop_boolean = (block, objSource) => {
        let newBlock = workspace.newBlock('prop_boolean', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_boolean"], "prop_name");
        let newBlockOutput = block.outputConnection;
        newBlockOutput.connect(block);
    };

    return {
        obj
    };
};