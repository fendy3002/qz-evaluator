import Blockly from 'blockly/core';
import { createMinusField } from '../fields/minus';

let supportedValue = ["boolean", "string", "number", "date"];
const ifsMutator = {
    // TODO: This should be its own extension. But that requires core changes.
    suppressPrefixSuffix: true,

    /**
     * Number of clauseCount inputs on this block.
     * @type {number}
     */
    clauseCount_: 1,

    /**
     * Creates XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.clauseCount_) {
            return null;
        }
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('clausecount', this.clauseCount_);
        return container;
    },

    /**
     * Parses XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        const targetCount = parseInt(xmlElement.getAttribute('clausecount'), 10) || 1;
        this.updateShape_(targetCount);
    },

    /**
     * Adds else-if and do inputs to the block until the block matches the
     * target else-if count.
     * @param {number} targetCount The target number of else-if inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function (targetCount) {
        while (this.clauseCount_ < targetCount) {
            this.addClause_();
        }
        while (this.clauseCount_ > targetCount) {
            this.removeClause_();
        }
    },

    /**
     * Callback for the plus field. Adds an else-if input to the block.
     */
    plus: function () {
        this.addClause_();
    },

    /**
     * Callback for the minus field. Triggers "removing" the input at the specific
     * index.
     * @see removeInput_
     * @param {number} index The index of the else-if input to "remove".
     * @this Blockly.Block
     */
    minus: function (index) {
        if (this.clauseCount_ <= 1) {
            return;
        }
        this.removeClause_(index);
    },

    /**
     * Adds an else-if and a do input to the bottom of the block.
     * @this Blockly.Block
     * @private
     */
    addClause_: function () {
        // Because else-if inputs are 1-indexed we increment first, decrement last.
        this.appendValueInput('clause' + this.clauseCount_)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("else if")
            .setCheck('boolean')
            .appendField(
                createMinusField(this.clauseCount_), 'MINUS' + this.clauseCount_);
        this.appendValueInput('value' + this.clauseCount_)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("then")
            .setCheck(supportedValue);

        this.moveInputBefore('value_else', /* put at end */ null);
        this.clauseCount_++;
    },

    /**
     * Appears to remove the input at the given index. Actually shifts attached
     * blocks and then removes the input at the bottom of the block. This is to
     * make sure the inputs are always IF0, IF1, etc with no gaps.
     * @param {number?} opt_index The index of the input to "remove", or undefined
     *     to remove the last input.
     * @this Blockly.Block
     * @private
     */
    removeClause_: function (opt_index) {
        // The strategy for removing a part at an index is to:
        //  - Kick any blocks connected to the relevant inputs.
        //  - Move all connect blocks from the other inputs up.
        //  - Remove the last input.
        // This makes sure all of our indices are correct.

        if (opt_index !== undefined && opt_index != this.clauseCount_) {
            const clauseIndex = opt_index;
            const inputs = this.inputList;
            if (inputs[clauseIndex * 2 + 1]) {
                let connection = inputs[clauseIndex * 2 + 1].connection; // If connection.
                if (connection && connection.isConnected()) {
                    connection.disconnect();
                }
            }
            if (inputs[clauseIndex * 2 + 2]) {
                let connection = inputs[clauseIndex * 2 + 2].connection; // then connection.
                if (connection && connection.isConnected()) {
                    connection.disconnect();
                }
            }

            this.bumpNeighbours();
            for (let i = clauseIndex * 2 + 3; i < this.inputList.length - 1; i += 2) {
                let clauseInput = this.inputList[i];
                if (clauseInput.name == "value_else") { break; }
                else if (!clauseInput) { break; }
                else {
                    let valueInput = this.inputList[i + 1];
                    const clauseTargetConnection = clauseInput.connection.targetConnection;
                    if (clauseTargetConnection && this.inputList[i - 2] && this.inputList[i - 3].connection) {
                        this.inputList[i - 2].connection.connect(clauseTargetConnection);
                    }
                    const valueTargetConnection = valueInput.connection.targetConnection;
                    if (valueTargetConnection && this.inputList[i - 1] && this.inputList[i - 1].connection) {
                        this.inputList[i - 1].connection.connect(valueTargetConnection);
                    }
                }
            }
        }

        this.removeInput('clause' + (this.clauseCount_ - 1));
        this.removeInput('value' + (this.clauseCount_ - 1));
        // Because else-if inputs are 1-indexed we increment first, decrement last.
        this.clauseCount_--;
    },
};

/**
 * Adds the initial plus button to the if block.
 * @this Blockly.Block
 */
const ifsHelper = function () {
    // this.getInput('clause0').insertFieldAt(0, createPlusField(), 'PLUS');
};

export const register = (registerMutator) => {
    registerMutator('ifs_mutator', ifsMutator, ifsHelper);
};