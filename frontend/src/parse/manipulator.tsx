
let populate = (workspace, parseObj) => {
    let c_number = (parentConnection, objSource) => {
        let value = objSource['$c_number'];
        let newBlock = workspace.newBlock('c_number', true);
        newBlock.initSvg();

        let sourceInput = newBlock.getInput('source');
        parseObj(sourceInput.connection, value);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let c_string = (parentConnection, objSource) => {
        let value = objSource['$c_string'];
        let newBlock = workspace.newBlock('c_string', true);
        newBlock.initSvg();

        let sourceInput = newBlock.getInput('source');
        parseObj(sourceInput.connection, value);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let c_dateto_string = (parentConnection, objSource) => {
        let { source, format_to } = objSource['$c_dateto_string'];
        let newBlock = workspace.newBlock('c_dateto_string', true);
        newBlock.initSvg();

        let sourceInput = newBlock.getInput('source');
        parseObj(sourceInput.connection, source);
        newBlock.setFieldValue(format_to, "format_to");

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    return {
        c_number,
        c_string,
        c_dateto_string
    };
};

export {
    populate
};