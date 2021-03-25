import * as Blockly from 'blockly';

let compare = {
    init: function () {
        this.setColour(210);
        this.setOutput(true, ["boolean"]);
        this.setInputsInline(false);

        this.appendValueInput('source')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("$compare")
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

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('"')
            .appendField(new Blockly.FieldTextInput(''), 'string_value')
            .appendField('"');
    }
};

export {
    compare,
    and
};