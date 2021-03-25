import Blockly from 'blockly';
let lo = require('lodash');

const QzEvaluator = (elem, option?: any) => {
    let useOption = lo.merge({
        readonly: false
    }, option);
    let hide = () => {
        elem.classList.add("d-none");
    };
    let show = () => {
        elem.classList.remove("d-none");
    };

    let toolbox = (window as any).$(`<xml id="toolbox" style="display: none">
        <category name="Misc" colour="290">
            <block type="start"></block>
        </category>
        <category name="Properties" colour="20">
            <block type="s_prop"></block>
            <block type="number"></block>
            <block type="string"></block>
            <block type="s_boolean"></block>
            <block type="boolean"></block>
            <block type="s_date"></block>
            <block type="array"></block>
        </category>
        <category name="Logic" colour="210">
            <block type="s_compare"></block>
            <block type="s_and"></block>
            <block type="s_or"></block>
            <block type="s_between"></block>
            <block type="s_between_ex"></block>
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
export default QzEvaluator;