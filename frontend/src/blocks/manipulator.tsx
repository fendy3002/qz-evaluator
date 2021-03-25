import * as Blockly from 'blockly';
import { createPlusField } from '../fields/plus';
import { createMinusField } from '../fields/minus';

let c_number = {
    init: function () {
        this.setColour(230);
        this.setOutput(true, ["number"]);
        this.setInputsInline(true);

        this.appendValueInput('source')
            .setCheck(['string']);
        this.appendDummyInput()
            .appendField(' as number');
    }
};
let c_string = {
    init: function () {
        this.setColour(230);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendValueInput('source')
            .setCheck(['number', 'boolean', 'date']);
        this.appendDummyInput()
            .appendField(' as string');
    }
};
let c_dateto_string = {
    init: function () {
        this.setColour(230);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .appendField('format date ')
        this.appendValueInput('source')
            .setCheck(['date']);
        this.appendDummyInput()
            .appendField(' to "')
            .appendField(new Blockly.FieldTextInput(''), 'format_to')
            .appendField('"');
    }
};
let c_string_todate = {
    init: function () {
        this.setColour(230);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .appendField('"')
        this.appendValueInput('source')
            .setCheck(['string']);
        this.appendDummyInput()
            .appendField('" to date');
    }
};
export {
    c_number,
    c_string,
    c_dateto_string,
    c_string_todate
};