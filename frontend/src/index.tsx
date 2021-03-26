import Blockly from 'blockly';
import * as mutator from './mutator';
import * as blocks from './blocks';
import * as jsonify from './jsonify';
let lo = require('lodash');

export enum EvalMode {
    ALL = "",
    NUMBER = "number",
    BOOLEAN = "boolean",
};
export interface Option {
    readonly?: boolean
    evalMode?: EvalMode
};

const blockly = (elem, option?: any) => {
    let useOption = lo.merge({
        readonly: false,
        evalMode: EvalMode.ALL
    }, option);

    let hide = () => {
        elem.classList.add("d-none");
    };
    let show = () => {
        elem.classList.remove("d-none");
    };

    mutator.register(Blockly.Extensions.registerMutator);

    let populatedBlocks = blocks.populate(useOption);
    for (let prop of Object.keys(populatedBlocks)) {
        Blockly.Blocks[prop] = populatedBlocks[prop];
    }

    let properties = `
        <block type="prop_string"></block>
        <block type="prop_number"></block>
        <block type="prop_boolean"></block>
        <block type="prop_date"></block>
        <block type="number"></block>
        <block type="string"></block>
        <block type="boolean"></block>

        <block type="date">
            <field name="string_value">1990-01-01</field>
        </block>
        <block type="date">
            <field name="string_value">NOW</field>
        </block>
        `;

    let logic = `
        <block type="compare"></block>
        <block type="and"></block>
        <block type="or"></block>
        `;

    let manipulator = `
        <block type="c_number"></block>
        <block type="c_string"></block>
        <block type="c_dateto_string">
            <field name="format_to">YYYY-MM-DD</field>
        </block>
        <block type="c_string_todate">
            <field name="format_from">YYYY-MM-DD</field>
        </block>
        <block type="m_two"></block>
        <block type="m_sum"></block>
        <block type="m_op_one"></block>
        <block type="m_op_two">
            <value name="right">
                <block type="number">
                    <field name="number_value">0</field>
                </block>
            </value>
        </block>
        <block type="s_one"></block>
        <block type="s_two"></block>
        <block type="s_three">
            <value name="middle">
                <block type="number">
                    <field name="number_value">0</field>
                </block>
            </value>
        </block>
        <block type="d_manipulate">
            <value name="value">
                <block type="number">
                    <field name="number_value">1</field>
                </block>
            </value>
            <field name="modifier">days</field>
        </block>
        `;

    // let logic = `
    //     <block type="compare"></block>
    //     <block type="and"></block>
    //     <block type="or"></block>
    //     <block type="between"></block>
    //     <block type="between_ex"></block>`;
    // let misc = `
    //     <block type="evaluator"></block>
    // `;
    let toolbox = (window as any).$(`<xml id="toolbox" style="display: none">
        <category name="Misc" colour="290">
        </category>
        <category name="Properties" colour="20">
            ${properties}
        </category>
        <category name="Manipulator" colour="210">
            ${manipulator}
        </category>
        <category name="Logic" colour="210">
            ${logic}
        </category>
        </xml>`);

    let ws = Blockly.inject(elem, {
        //rtl: true,
        toolbox: toolbox.get(0),
        //media: 'media/',    // to avoid reaching to the web for icons
        sounds: false,
        readOnly: useOption.readonly,
        collapse: true, comments: true, disable: false,
        trashcan: true // those ones are automatically true when there are categories
    });

    let addBlock = (ws) => {
        let block = ws.newBlock('evaluator', true);
        block.initSvg();
        block.render();
    };
    addBlock(ws);

    setTimeout(() => {
        hide();
        show();
    }, 300);

    let getValue = () => {
        return jsonify.jsonify(ws);
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