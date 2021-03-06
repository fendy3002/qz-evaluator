import Blockly, { Workspace } from 'blockly';
import * as mutator from './mutator';
import * as blocks from './blocks';
import * as jsonify from './jsonify';
import * as parse from './parse';
import * as jsYaml from 'js-yaml';

let lo = require('lodash');

export enum EvalMode {
    ALL = "",
    NUMBER = "number",
    BOOLEAN = "boolean",
};
export interface Option {
    autosave?: boolean,
    readonly?: boolean,
    evalMode?: EvalMode
};

const render = (elem, option?: any) => {
    let useOption = lo.merge({
        autosave: false,
        readonly: false,
        evalMode: EvalMode.ALL
    }, option);

    let hide = () => {
        elem.style.visibility = "hidden";
    };
    let show = () => {
        elem.style.visibility = "visible";
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

        <block type="array"></block>
        <block type="prop_array"></block>
        `;

    let logic = `
        <block type="ifs"></block>
        <block type="compare"></block>
        <block type="and"></block>
        <block type="or"></block>
        <block type="between"></block>
        <block type="between_ex"></block>
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
        <block type="s_op_one"></block>
        <block type="s_op_two">
            <value name="right">
                <block type="number">
                    <field name="number_value">0</field>
                </block>
            </value>
        </block>
        <block type="s_op_three">
            <value name="middle">
                <block type="number">
                    <field name="number_value">0</field>
                </block>
            </value>
            <value name="right">
                <block type="number">
                    <field name="number_value">0</field>
                </block>
            </value>
        </block>
        <block type="s_join">
            <field name="delimiter">&#160;</field>
        </block>
        <block type="d_manipulate">
            <value name="value">
                <block type="number">
                    <field name="number_value">1</field>
                </block>
            </value>
            <field name="modifier">days</field>
        </block>
        <block type="array_handle"></block>
        <block type="var_length"></block>
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
        zoom: {
            controls: true,
            wheel: true,
            pinch: true,
            startScale: 0.9,
            minScale: 0.6,
            maxScale: 2,
        },
        //media: 'media/',    // to avoid reaching to the web for icons
        sounds: false,
        readOnly: useOption.readonly,
        scrollbars: true,
        collapse: true, comments: true, disable: false,
        trashcan: true // those ones are automatically true when there are categories
    });
    if (useOption.autosave) {
        let saveHandler = null;

        ws.addChangeListener((evt) => {
            // exclude non-changing events
            if ([
                "click",
                "drag",
                "selected",
                "toolbox_item_select"
            ].indexOf(evt.type) < 0) {
                if (!saveHandler) {
                    saveHandler = setTimeout(() => {
                        save();
                        saveHandler = null;
                    }, 1000);
                }
            }
        });
    }
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
    };
    let getYaml = () => {
        return jsYaml.dump(getValue());
    };

    let parseJson = (jsonValue) => {
        parse.parse(ws, jsonValue);
        // Blockly.logical_compare.parseText(JSON.stringify(jsonValue), Blockly.getMainWorkspace());
    };
    let parseYaml = (yamlString) => {
        parseJson(jsYaml.load(yamlString))
    };
    let id = elem.id ?? "";
    let save = () => {
        localStorage.setItem('_jsonval_' + id, JSON.stringify(getValue()));
    };
    let load = () => {
        let _jsonval = localStorage.getItem('_jsonval_' + id);
        if (_jsonval) {
            parseJson(JSON.parse(_jsonval));
        }
    };
    return {
        hide,
        show,
        parseYAML: parseYaml,
        parseJSON: parseJson,
        getValue,
        getYAML: getYaml,
        save,
        load
    };
};
export {
    render
};