import * as Blockly from 'blockly';
import * as comparer from './comparer';
import * as manipulator from './manipulator';
import * as array from './array';

let populate = (option) => {
    let evaluator = {
        init: function () {
            let check = [];
            if (option.evalMode == "" || option.evalMode == "ALL") {
                check = ['boolean', 'number', 'string'];
            } else if (option.evalMode == "number") {
                check = ['number'];
            } else if (option.evalMode == "boolean") {
                check = ['boolean'];
            }
            this.setColour(290);
            this.appendValueInput('json')
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField("Eval")
                .setCheck(check);

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
                return source.replace(/[^0-9-]/gi, "");
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

            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField('"')
                .appendField(new Blockly.FieldTextInput(''), 'string_value')
                .appendField('" as date');
        }
    };
    return {
        evaluator,
        string,
        date,
        number,
        boolean,
        prop_string,
        prop_number,
        prop_boolean,
        prop_date,
        ...comparer,
        ...manipulator,
        ...array
    };
}

export { populate };