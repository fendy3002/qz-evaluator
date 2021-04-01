
let populate = (workspace, parseObj) => {
    let array = (parentConnection, objSource) => {
        let clauses = objSource['$array'];
        let newBlock = workspace.newBlock('array', true);
        newBlock.initSvg();
        newBlock.render();

        let index = 0;
        for (let eachClause of clauses) {
            if (index > 1) {
                newBlock.addClause_.bind(newBlock)();
            }
            parseObj(
                newBlock.getInput(`elem${index}`).connection,
                eachClause
            );
            index++;
        }

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let prop_array = (parentConnection, objSource) => {
        let newBlock = workspace.newBlock('prop_array', true);
        newBlock.initSvg();

        newBlock.setFieldValue(objSource["$prop_array"], "prop_name");
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let array_handle = (parentConnection, objSource) => {
        let { source, operation, handler } = objSource['$array_handle'];
        let newBlock = workspace.newBlock('array_handle', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('source').connection
            , source);
        newBlock.setFieldValue(operation, "operation");
        parseObj(
            newBlock.getInput('handler').connection
            , handler);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    return {
        array,
        prop_array,
        array_handle
    };
};

export {
    populate
};