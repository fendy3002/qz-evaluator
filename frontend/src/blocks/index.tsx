import * as Blockly from 'blockly';
let evaluator = {
    init: function () {
        this.setColour(290);
        this.appendValueInput('json')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Eval")
            .setCheck(['s_boolean']);

        this.setDeletable(false);
    }
};

let string = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["string"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput(''), 'string_value')
            .appendField('"');
    }
};

let number = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["number"]);

        let numberValidator = (source => {
            return source.replace(/[^\\d]/gi, "");
        });

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldTextInput('0', numberValidator), "number_value");
    }
};

const boolean = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["boolean"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['true', "TRUE"],
                ['false', "FALSE"]
            ]), 'bool_value');
    }
};

const prop = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["prop"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name')
        
        this.appendValueInput('CONVERTER')
            .setCheck('converter')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('as');
    }
};

const compare = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["boolean"]);
        this.setInputsInline(false);

        this.appendValueInput('source')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("$compare")
            .setCheck(['prop', 'date']);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('')
            .appendField(new Blockly.FieldDropdown([
                ['Equal', "eq"],
                ['Not equal', "ne"],
                ['>', "gt"],
                ['>=', "gte"],
                ['<', "lt"],
                ['<=', "lte"],
                ['Start with', "starts_with"],
                ['End with', "ends_with"],
                ['Contains', "contains"],
                ['Regex', "regex"],
                ['In', "in"]
            ]), 'operation');

        this.appendValueInput('compare')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("")
            .setCheck([
                'string',
                'number',
                'boolean',
                'array',
                'prop',
                'date',
            ]);
    }
};


export {
    evaluator,
    string,
    number,
    boolean,
    prop,
    compare
};