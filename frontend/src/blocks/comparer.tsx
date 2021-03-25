import * as Blockly from 'blockly';
import { createPlusField } from '../fields/plus';
import { createMinusField } from '../fields/minus';

let compare = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["boolean"]);
        this.setInputsInline(false);

        this.appendValueInput('source')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("compare")
            .setCheck(['number', 'date', 'string', 'boolean']);

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
                'date'
            ]);
    }
};

let and = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["boolean"]);

        // this.appendStatementInput('EVAL')
        //     .appendField('and');
        this.appendDummyInput()
            .appendField(createPlusField(), "PLUS")
            .appendField("and");

        this.appendValueInput('clause0')
            .setCheck('boolean')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                createMinusField(0), 'MINUS0');
        this.appendValueInput('clause1')
            .setCheck('boolean')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                createMinusField(1), 'MINUS1');

        // this.setMutator(new Blockly.Mutator(['my_block_A', 'my_block_B']));
        this.jsonInit({ "mutator": "and_or_mutator" });
    },
};
let or = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["boolean"]);

        // this.appendStatementInput('EVAL')
        //     .appendField('and');
        this.appendDummyInput()
            .appendField(createPlusField(), "PLUS")
            .appendField("or");

        this.appendValueInput('clause0')
            .setCheck('boolean')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                createMinusField(0), 'MINUS0');
        this.appendValueInput('clause1')
            .setCheck('boolean')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                createMinusField(1), 'MINUS1');

        // this.setMutator(new Blockly.Mutator(['my_block_A', 'my_block_B']));
        this.jsonInit({ "mutator": "and_or_mutator" });
    },
};

export {
    compare,
    and,
    or
};