
let populate = (processBlock) => {
    let c_number = (block) => {
        let source = block.getInputTargetBlock('source');
        return {
            $c_number: processBlock(source)
        };
    };
    let c_string = (block) => {
        let source = block.getInputTargetBlock('source');
        return {
            $c_string: processBlock(source)
        };
    };
    let c_dateto_string = (block) => {
        let source = block.getInputTargetBlock('source');
        let format_to = block.getFieldValue('format_to');
        return {
            $c_dateto_string: {
                source: processBlock(source),
                format_to: format_to
            }
        };
    };
    let c_string_todate = (block) => {
        let source = block.getInputTargetBlock('source');
        let format_from = block.getFieldValue('format_from');
        return {
            $c_string_todate: {
                source: processBlock(source),
                format_from: format_from
            },
        };
    };

    return {
        c_number,
        c_string,
        c_dateto_string,
        c_string_todate
    };
};

export {
    populate
};