
let populate = (processBlock) => {
    let array = (block) => {
        let length = block.clauseCount_;
        let result = [];
        for (let index = 0; index < length; index++) {
            let source = block.getInputTargetBlock('elem' + index);
            if (source) {
                let value = processBlock(source);
                if (value !== null) {
                    result.push(value);
                }
            }
            else {
            }
        }
        return {
            $array: result
        };
    };
    let prop_array = (block) => {
        let prop_name = block.getFieldValue('prop_name');
        return { $prop_array: prop_name };
    };
    let array_handle = (block) => {
        let source = block.getInputTargetBlock('source');
        let operation = block.getFieldValue('operation');
        let handler = block.getInputTargetBlock('handler');
        return {
            $array_handle: {
                left: processBlock(source),
                operation: operation,
                right: processBlock(handler)
            },
        };
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