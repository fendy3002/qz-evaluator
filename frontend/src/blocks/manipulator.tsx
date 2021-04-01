import * as Blockly from 'blockly';
import { createPlusField } from '../fields/plus';
import { createMinusField } from '../fields/minus';

let color = {
    converter: 230,
    math: 250,
    string: 270,
    date: 290,
    manipulator: 310
};

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
        this.setOutput(true, ["date"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .appendField('"')
        this.appendValueInput('source')
            .setCheck(['string']);
        this.appendDummyInput()
            .appendField('" to date with format ')
            .appendField(new Blockly.FieldTextInput(''), 'format_from');
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
            .setCheck(['number', 'array'])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('clause1')
            .setCheck(['number', 'array'])
            .setAlign(Blockly.ALIGN_RIGHT);

        this.jsonInit({ "mutator": "sum_mutator" });
    }
};
let s_two = {
    init: function () {
        this.setColour(color.math);
        this.setOutput(true, ["string"]);
        this.setInputsInline(true);

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('"');
        this.appendValueInput('left')
            .setCheck(['string']);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('" concat "');
        this.appendValueInput('right')
            .setCheck(['string']);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField('"');
    }
};
let s_op_one = {
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
let s_op_two = {
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
let s_op_three = {
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
let s_join = {
    init: function () {
        this.setColour(color.string);
        this.setOutput(true, ["string"]);
        this.setInputsInline(false);

        // this.appendStatementInput('EVAL')
        //     .appendField('and');
        this.appendDummyInput()
            .appendField(createPlusField(), "PLUS")
            .appendField("concat with delimiter ")
            .appendField(new Blockly.FieldTextInput(''), 'delimiter');

        this.appendValueInput('clause0')
            .setCheck(['string', "array"])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('clause1')
            .setCheck(['string', "array"])
            .setAlign(Blockly.ALIGN_RIGHT);

        this.jsonInit({ "mutator": "s_join_mutator" });
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
            .appendField('.add (');

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
let var_length = {
    init: function () {
        this.setColour(color.manipulator);
        this.setOutput(true, "number");
        this.setInputsInline(true);

        this.appendValueInput('source')
            .setCheck(["string", "array"]);
        this.appendDummyInput()
            .appendField(".length");
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
    s_two,
    s_op_one,
    s_op_two,
    s_op_three,
    s_join,
    d_manipulate,
    var_length
};