
let populate = (workspace, parseObj) => {
    let compare = (parentConnection, objSource) => {
        let [
            sourceValue,
            operation,
            compareValue
        ] = objSource['$compare'];
        let newBlock = workspace.newBlock('compare', true);
        newBlock.initSvg();

        let sourceInput = newBlock.getInput('source');
        parseObj(sourceInput.connection, sourceValue);
        newBlock.setFieldValue(operation, "operation");
        let compareInput = newBlock.getInput('compare');
        parseObj(compareInput.connection, compareValue);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    return {
        compare,
        // and,
        // or,
        // ifs
    };
};

export {
    populate
};