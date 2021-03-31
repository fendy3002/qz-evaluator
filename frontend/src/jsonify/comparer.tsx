
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
            $compare: {
                source: sourceValue,
                operation: operation,
                compare: compareValue
            }
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
        let length = block.clauseCount_;
        let cases = [];
        let elseInput = block.getInputTargetBlock('value_else');
        for (let index = 0; index < length; index++) {
            let clauseBlock = block.getInputTargetBlock('clause' + index);
            if (clauseBlock) {
                let clauseValue = processBlock(clauseBlock);
                if (clauseValue !== null) {
                    let valueBlock = block.getInputTargetBlock('value' + index);
                    let value = processBlock(valueBlock);
                    cases.push({
                        clause: clauseValue,
                        value: value
                    });
                }
            }
        }
        return {
            $ifs: {
                cases: cases,
                elseValue: processBlock(elseInput)
            }
        };
    }
    let betweenRaw = (block) => {
        let min = block.getInputTargetBlock('min');
        let source = block.getInputTargetBlock('source');
        let max = block.getInputTargetBlock('max');

        let minValue = null;
        if (min) {
            minValue = processBlock(min);
        }
        let sourceValue = null;
        if (source) {
            sourceValue = processBlock(source);
        }
        let maxValue = null;
        if (max) {
            maxValue = processBlock(max);
        }
        return {
            source: sourceValue,
            min: minValue,
            max: maxValue
        };
    };
    let between = (block) => {
        return {
            $between: betweenRaw(block)
        };
    };
    let between_ex = (block) => {
        return {
            $between_ex: betweenRaw(block)
        };
    };

    return {
        compare,
        and,
        or,
        ifs,
        between,
        between_ex
    };
};

export {
    populate
};