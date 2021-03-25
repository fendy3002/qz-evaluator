import Blockly from 'blockly';
import * as mutator from './mutator';
import * as blocks from './blocks';
let lo = require('lodash');

const blockly = (elem, option?: any) => {
    let useOption = lo.merge({
        readonly: false
    }, option);
    let hide = () => {
        elem.classList.add("d-none");
    };
    let show = () => {
        elem.classList.remove("d-none");
    };

    mutator.register(Blockly.Extensions.registerMutator);

    for (let prop of Object.keys(blocks)) {
        Blockly.Blocks[prop] = blocks[prop];
    }

    let properties = `
        <block type="prop_string"></block>
        <block type="prop_number"></block>
        <block type="prop_boolean"></block>
        <block type="number"></block>
        <block type="string"></block>
        <block type="boolean"></block>
        <block type="date"></block>`;
    
    let logic = `
        <block type="compare"></block>
        <block type="and"></block>
        <block type="or"></block>`;
    
    // let logic = `
    //     <block type="compare"></block>
    //     <block type="and"></block>
    //     <block type="or"></block>
    //     <block type="between"></block>
    //     <block type="between_ex"></block>`;
    let toolbox = (window as any).$(`<xml id="toolbox" style="display: none">
        <category name="Misc" colour="290">
            <block type="evaluator"></block>
        </category>
        <category name="Properties" colour="20">
            ${properties}
        </category>
        <category name="Logic" colour="210">
            ${logic}
        </category>
        </xml>`);

    Blockly.inject(elem, {
        //rtl: true,
        toolbox: toolbox.get(0),
        //media: 'media/',    // to avoid reaching to the web for icons
        sounds: false,
        readOnly: useOption.readonly,
        collapse: true, comments: true, disable: false,
        trashcan: true // those ones are automatically true when there are categories
    });
    setTimeout(() => {
        hide();
        show();
    }, 300);

    let getValue = () => {
        return {};
        // let currentText = Blockly.logical_compare.toText(Blockly.getMainWorkspace());
        // if (!currentText) {
        //     return null;
        // }
        // return JSON.parse(currentText);
    };

    let parseJson = (jsonValue) => {
        // Blockly.logical_compare.parseText(JSON.stringify(jsonValue), Blockly.getMainWorkspace());
    };
    return {
        hide,
        show,
        parseJson,
        getValue
    };
};
export {
    blockly
};