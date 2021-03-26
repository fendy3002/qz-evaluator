import * as Blockly from 'blockly';
import { createPlusField } from '../fields/plus';
import { createMinusField } from '../fields/minus';

let color = {
    converter: 230,
    math: 250,
    string: 270,
    date: 290
}

let c_number = {
    init: function () {
        this.setColour(color.converter);
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
        this.setColour(color.converter);
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
        this.setColour(color.converter);
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
        this.setColour(color.converter);
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

let m_two = {
    init: function () {
        this.setColour(color.math);
        this.setOutput(true, ["number"]);
        this.setInputsInline(true);

        this.appendValueInput('left')
            .setCheck(['number']);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['+', "plus"],
                ['-', "minus"],
                ['*', "multiply"],
                ['/', "divide"],
                ['%', "mod"],
            ]), 'operation');
        this.appendValueInput('right')
            .setCheck(['number']);
    }
};

let m_op_one = {
    init: function () {
        this.setColour(color.math);
        this.setOutput(true, ["number"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['ABS', "abs"],
                ['FLOOR', "floor"],
                ['CEIL', "ceil"],
                ['ROUND', "round"],
                ['AVG', "avg"],
                ['ROOT', "root"],
                ['LOG', "log"],
            ]), 'operation')
            .appendField(' (');
        this.appendValueInput('left')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(')');
    }
};
let m_op_two = {
    init: function () {
        this.setColour(color.math);
        this.setOutput(true, ["number"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['ROUND', "round"],
                ['POW', "pow"],
                ['ROOT', "root"],
                ['LOG', "log"],
            ]), 'operation')
            .appendField(' (');
        this.appendValueInput('left')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput('right')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(')');
    }
};
let m_sum = {
    init: function () {
        this.setColour(color.math);
        this.setOutput(true, ["number"]);
        this.setInputsInline(false);

        // this.appendStatementInput('EVAL')
        //     .appendField('and');
        this.appendDummyInput()
            .appendField(createPlusField(), "PLUS")
            .appendField("sum");

        this.appendValueInput('clause0')
            .setCheck('number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                createMinusField(0), 'MINUS0');
        this.appendValueInput('clause1')
            .setCheck('number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                createMinusField(1), 'MINUS1');

        this.jsonInit({ "mutator": "sum_mutator" });
    }
};
let s_one = {
    init: function () {
        this.setColour(color.string);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['UPPER', "upper"],
                ['LOWER', "lower"],
                ['TRIM', "trim"],
                ['TRIM_END', "trim_end"],
                ['TRIM_START', "trim_start"],
            ]), 'operation')
            .appendField(' ("');
        this.appendValueInput('left')
            .setCheck(['string']);
        this.appendDummyInput()
            .appendField('")');
    }
};
let s_two = {
    init: function () {
        this.setColour(color.string);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['LEFT', "left"],
                ['RIGHT', "right"],
                ['CHAR AT', "char_at"],
                ['CHAR AT', "chart_at"],
            ]), 'operation')
            .appendField(' ("');
        this.appendValueInput('left')
            .setCheck(['string']);
        this.appendDummyInput()
            .appendField('",');
        this.appendValueInput('right')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(')');
    }
};
let s_three = {
    init: function () {
        this.setColour(color.string);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['SUBSTRING', "substring"],
            ]), 'operation')
            .appendField(' ("');
        this.appendValueInput('left')
            .setCheck(['string']);
        this.appendDummyInput()
            .appendField('",');
        this.appendValueInput('middle')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput('right')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(')');
    }
};
let d_manipulate = {
    init: function () {
        this.setColour(color.string);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendValueInput('left')
            .setCheck(['date']);

        this.appendDummyInput()
            .appendField(' add (');

        this.appendValueInput('value')
            .setCheck(['number']);
        this.appendDummyInput()
            .appendField(',');
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown([
                ['hours', "hours"],
                ['days', "days"],
            ]), 'modifier');
        this.appendDummyInput()
            .appendField(')');
    }
};

export {
    c_number,
    c_string,
    c_dateto_string,
    c_string_todate,
    m_two,
    m_op_one,
    m_op_two,
    m_sum,
    s_one,
    s_two,
    s_three,
    d_manipulate,
};