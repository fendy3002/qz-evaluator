
let populate = (processBlock) => {
    let compare = (block) => {
        let string_value = block.getFieldValue('string_value');
        return { $string: string_value };
    };

    let and = (block) => {
        return {
            $and: generateAndOr(block)
        }
    };
    let or = (block) => {
        return {
            $or: generateAndOr(block)
        }
    };

    let generateAndOr = (block) => {
        let length = block.clauseCount_;
        let result = [];
        for (let index = 0; index < length; index++) {
            let source = block.getInputTargetBlock('clause' + index);
            if (source) {
                let value = processBlock(source);
                if (value !== null) {
                    result.push(value);
                }
            }
            else {
            }
        }
        return result;
    };

    return {
        compare,
        and
    };
};

export {
    populate
};