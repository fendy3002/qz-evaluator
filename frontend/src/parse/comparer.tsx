
let populate = (workspace, parseObj) => {
    let compare = (parentConnection, objSource) => {
        let {
            source,
            operation,
            compare
        } = objSource['$compare'];
        let newBlock = workspace.newBlock('compare', true);
        newBlock.initSvg();

        let sourceInput = newBlock.getInput('source');
        parseObj(sourceInput.connection, source);
        newBlock.setFieldValue(operation, "operation");
        let compareInput = newBlock.getInput('compare');
        parseObj(compareInput.connection, compare);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    let andOr = (operation) => (parentConnection, objSource) => {
        let cases = objSource['$' + operation];
        let newBlock = workspace.newBlock(operation, true);
        newBlock.initSvg();
        newBlock.render(); // don't know why need to render first

        let index = 0;
        for (let eachCase of cases) {
            if (index > 1) {
                newBlock.addClause_.bind(newBlock)();
            }
            parseObj(
                newBlock.getInput(`clause${index}`).connection,
                eachCase
            );
            index++;
        }
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    }

    let ifs = (parentConnection, objSource) => {
        let { cases, else_value } = objSource['$ifs'];
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
        parseObj(valueElseInput.connection, else_value);
        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    let betweenRaw = (key) => (parentConnection, objSource) => {
        let { source, min, max } = objSource['$' + key];

        let newBlock = workspace.newBlock(key, true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput(`source`).connection,
            source
        );
        parseObj(
            newBlock.getInput(`min`).connection,
            min
        );
        parseObj(
            newBlock.getInput(`max`).connection,
            max
        );

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    }

    return {
        compare,
        ifs,
        and: andOr("and"),
        or: andOr("or"),
        between: betweenRaw("between"),
        between_ex: betweenRaw("between_ex")
    };
};

export {
    populate
};