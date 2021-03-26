
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
    let m_two = (block) => {
        let left = block.getInputTargetBlock('left');
        let operation = block.getFieldValue('operation');
        let right = block.getInputTargetBlock('right');
        return {
            $m_two: {
                left: processBlock(left),
                operation: operation,
                right: processBlock(right)
            },
        };
    };
    let m_op_one = (block) => {
        let left = block.getInputTargetBlock('left');
        let operation = block.getFieldValue('operation');
        return {
            $m_op_one: {
                left: processBlock(left),
                operation: operation,
            },
        };
    };
    let m_op_two = (block) => {
        let left = block.getInputTargetBlock('left');
        let operation = block.getFieldValue('operation');
        let right = block.getInputTargetBlock('right');
        return {
            $m_op_two: {
                left: processBlock(left),
                operation: operation,
                right: processBlock(right)
            },
        };
    };
    let s_op_one = (block) => {
        let left = block.getInputTargetBlock('left');
        let operation = block.getFieldValue('operation');
        return {
            $s_op_one: {
                left: processBlock(left),
                operation: operation,
            },
        };
    };
    let s_op_two = (block) => {
        let left = block.getInputTargetBlock('left');
        let operation = block.getFieldValue('operation');
        let right = block.getInputTargetBlock('right');
        return {
            $s_op_two: {
                left: processBlock(left),
                operation: operation,
                right: processBlock(right)
            },
        };
    };
    let s_op_three = (block) => {
        let left = block.getInputTargetBlock('left');
        let operation = block.getFieldValue('operation');
        let middle = block.getInputTargetBlock('middle');
        let right = block.getInputTargetBlock('right');
        return {
            $s_op_two: {
                left: processBlock(left),
                operation: operation,
                middle: processBlock(middle),
                right: processBlock(right)
            },
        };
    };
    let m_sum = (block) => {
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
        return {
            $m_sum: result
        };
    }

    return {
        c_number,
        c_string,
        c_dateto_string,
        c_string_todate,
        m_two,
        m_op_one,
        m_op_two,
        s_op_one,
        s_op_two,
        s_op_three,
        m_sum
    };
};

export {
    populate
};