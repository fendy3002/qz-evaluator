
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

    let ifs = (parentConnection, objSource) => {
        let { cases, elseValue } = objSource['$ifs'];
        let newBlock = workspace.newBlock('ifs', true);
        newBlock.initSvg();
        newBlock.render(); // don't know why need to render first

        let index = 0;
        for (let eachCase of cases) {
            if (index > 0) {
                newBlock.addClause_.bind(newBlock)();
            }
            if (eachCase) {
                parseObj(
                    newBlock.getInput(`clause${index}`).connection,
                    eachCase.clause
                );
                parseObj(
                    newBlock.getInput(`value${index}`).connection,
                    eachCase.value
                );
            }
            index++;
        }

        let valueElseInput = newBlock.getInput('value_else');
        parseObj(valueElseInput.connection, elseValue);
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    return {
        compare,
        // and,
        // or,
        ifs
    };
};

export {
    populate
};