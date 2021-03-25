import * as Blockly from 'blockly';
export * from './comparer';
export * from './manipulator';

let evaluator = {
    init: function () {
        this.setColour(290);
        this.appendValueInput('json')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Eval")
            .setCheck(['boolean', 'number', 'string']);

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

let prop_string = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["string"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name')
            .appendField('as string');
    }
};
let prop_number = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["number"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name')
            .appendField('as number');
    }
};
let prop_boolean = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["boolean"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name')
            .appendField('as boolean');
    }
};
let prop_date = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["date"]);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name')
            .appendField('as date');
    }
};

let date = {
    init: function () {
        this.setColour(20);
        this.setOutput(true, ["date"]);

        this.appendValueInput('date_source')
            .setCheck(['string'])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('$date');

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('formatFrom')
            .appendField(new Blockly.FieldTextInput(''), 'format_from');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('formatTo')
            .appendField(new Blockly.FieldTextInput(''), 'format_to');
    }
};

export {
    evaluator,
    string,
    date,
    number,
    boolean,
    prop_string,
    prop_number,
    prop_boolean,
    prop_date
};