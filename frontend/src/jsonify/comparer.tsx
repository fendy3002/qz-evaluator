
let populate = (processBlock) => {
    let compare = (block) => {
        let source = block.getInputTargetBlock('source');
        let operation = block.getFieldValue('operation');
        let compare = block.getInputTargetBlock('compare');

        let sourceValue = null;
        if (source) {
            sourceValue = processBlock(source);
        }
        let compareValue = null;
        if (compare) {
            compareValue = processBlock(compare);
        }
        return {
            $compare: [
                sourceValue,
                operation,
                compareValue
            ]
        };
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

    let ifs = (block) => {
        let cases = [];
        let elseInput = block.getInputTargetBlock('value_else');
        for (let index = 0; index < length; index++) {
            let clauseBlock = block.getInputTargetBlock('clause' + index);
            if (clauseBlock) {
                let clauseValue = processBlock(clauseBlock);
                if (clauseValue !== null) {
                    let valueBlock = block.getInputTargetBlock('value' + index);
                    cases.push({
                        clause: clauseValue,
                        value: valueBlock
                    });
                }
            }
            else {
            }
        }
        return {
            $if: {
                clauses: [],
                else: processBlock(elseInput)
            }
        };
    }

    return {
        compare,
        and,
        or,
        ifs
    };
};

export {
    populate
};