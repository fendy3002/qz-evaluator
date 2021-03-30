
let parse = (workspace, objSource) => {
    workspace.clear();

    let evaluatorBlock = workspace.newBlock('evaluator');
    evaluatorBlock.initSvg();
    parser(workspace).obj(evaluatorBlock.getInput("json"), objSource);
    workspace.render();
};
let parser = (workspace) => {
    let obj = (parentConnector, objSource) => {
        for (let key of Object.keys(objSource)) {
            let blockType = key.substring(1);
            blockLogic[blockType]?.(parentConnector, objSource);
        }
    };

    let string = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('string', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$string"], "string_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnector);
    };
    let number = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('number', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$number"], "number_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnector);
    };
    let boolean = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('boolean', true);
        newBlock.initSvg();

        let booleanValue = objSource["$boolean"];
        newBlock.setFieldValue(booleanValue ? "TRUE" : "FALSE", "bool_value");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnector);
    };
    let prop_string = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('prop_string', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_string"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnector);
    };
    let prop_number = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('prop_number', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_number"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        console.log("parentConnector", parentConnector);
        newBlockOutput.connect(parentConnector);
    };
    let prop_boolean = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('prop_boolean', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_boolean"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnector);
    };
    let prop_date = (parentConnector, objSource) => {
        let newBlock = workspace.newBlock('prop_date', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_date"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnector);
    };

    let blockLogic = {
        string,
        number,
        boolean,
        prop_string,
        prop_number,
        prop_boolean,
        prop_date,
    };

    return {
        obj
    };
};

export {
    parse
};