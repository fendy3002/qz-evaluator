
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
    let c_string_todate = (parentConnection, objSource) => {
        let { source, format_from } = objSource['$c_string_todate'];
        let newBlock = workspace.newBlock('c_string_todate', true);
        newBlock.initSvg();

        let sourceInput = newBlock.getInput('source');
        parseObj(sourceInput.connection, source);
        newBlock.setFieldValue(format_from, "format_from");

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    let m_two = (parentConnection, objSource) => {
        let { left, operation, right } = objSource['$m_two'];
        let newBlock = workspace.newBlock('m_two', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(operation, "operation");
        parseObj(
            newBlock.getInput('right').connection
            , right);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let m_op_one = (parentConnection, objSource) => {
        let { left, operation } = objSource['$m_op_one'];
        let newBlock = workspace.newBlock('m_op_one', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(operation, "operation");

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let m_op_two = (parentConnection, objSource) => {
        let { left, operation, right } = objSource['$m_op_two'];
        let newBlock = workspace.newBlock('m_op_two', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(operation, "operation");
        parseObj(
            newBlock.getInput('right').connection
            , right);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let s_op_one = (parentConnection, objSource) => {
        let { left, operation } = objSource['$s_op_one'];
        let newBlock = workspace.newBlock('s_op_one', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(operation, "operation");

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let s_op_two = (parentConnection, objSource) => {
        let { left, operation, right } = objSource['$s_op_two'];
        let newBlock = workspace.newBlock('s_op_two', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(operation, "operation");
        parseObj(
            newBlock.getInput('right').connection
            , right);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let s_op_three = (parentConnection, objSource) => {
        let { left, operation, middle, right } = objSource['$s_op_three'];
        let newBlock = workspace.newBlock('s_op_three', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(operation, "operation");
        parseObj(
            newBlock.getInput('middle').connection
            , middle);
        parseObj(
            newBlock.getInput('right').connection
            , right);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let m_sum = (parentConnection, objSource) => {
        let clauses = objSource['$m_sum'];
        let newBlock = workspace.newBlock('m_sum', true);
        newBlock.initSvg();
        newBlock.render();

        let index = 0;
        for (let eachClause of clauses) {
            if (index > 1) {
                newBlock.addClause_.bind(newBlock)();
            }
            parseObj(
                newBlock.getInput(`clause${index}`).connection,
                eachClause
            );
            index++;
        }

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };
    let d_manipulate = (parentConnection, objSource) => {
        let { 
            left,
            modifier,
            value,
         } = objSource['$d_manipulate'];
        let newBlock = workspace.newBlock('d_manipulate', true);
        newBlock.initSvg();

        parseObj(
            newBlock.getInput('left').connection
            , left);
        newBlock.setFieldValue(modifier, "modifier");
        parseObj(
            newBlock.getInput('value').connection
            , value);

        let newBlockOutput = newBlock.outputConnection;
        newBlockOutput.connect(parentConnection);
    };

    return {
        c_number,
        c_string,
        c_dateto_string,
        c_string_todate,
        m_two,
        m_op_one,
        m_op_two,
        m_sum,
        s_op_one,
        s_op_two,
        s_op_three,
        d_manipulate
    };
};

export {
    populate
};