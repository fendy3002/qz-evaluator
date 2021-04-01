import * as Blockly from 'blockly';
import { createPlusField } from '../fields/plus';
import { createMinusField } from '../fields/minus';

let color = {
    prop: 20,
    manipulator: 310
};

let supportedType = ['number', 'string', 'boolean', 'date'];
let array = {
    init: function () {
        this.setColour(color.prop);
        this.setOutput(true, ["array"]);
        this.setInputsInline(false);

        this.appendDummyInput()
            .appendField(createPlusField(), "PLUS")
            .appendField("array");

        this.appendValueInput('elem0')
            .setCheck(supportedType)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('elem1')
            .setCheck(supportedType)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.jsonInit({ "mutator": "array_mutator" });
    }
};
let prop_array = {
    init: function () {
        this.setColour(color.prop);
        this.setOutput(true, ["array"]);
        this.setInputsInline(false);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('$prop')
            .appendField(new Blockly.FieldTextInput(''), 'prop_name')
            .appendField('as array');
    }
};

let array_handle = {
    init: function () {
        this.setColour(color.manipulator);
        this.setOutput(true, "array");
        this.setInputsInline(true);

        this.appendValueInput('source')
            .setCheck("array");
        this.appendDummyInput()
            .appendField(".")
            .appendField(new Blockly.FieldDropdown([
                ['map', "map"],
                ['filter', "filter"],
                ['any', "any"],
            ]), 'operation')
            .appendField("((each, data) => ");
        this.appendValueInput('handler')
            .setCheck(["string", "number", "boolean", "date"]);
        this.appendDummyInput()
            .appendField(")");
    }
};
export {
    array,
    prop_array,
    array_handle
};