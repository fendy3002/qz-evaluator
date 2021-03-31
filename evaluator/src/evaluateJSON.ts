import * as types from './types';
import evaluateProps from './evaluateProps';
import evaluateLogic from './evaluateLogic';
import evaluateManipulatorM from './evaluateManipulatorM';
import evaluateManipulatorC from './evaluateManipulatorC';
let logicBlocks: any = {};
let processLogicBlock: types.ProcessLogicBlock = (data, obj: any) => {
    for (let key of Object.keys(obj)) {
        let logicType = key.substring(1);
        return logicBlocks[logicType]?.(data, obj);
    }
};
logicBlocks = {
    ...logicBlocks,
    ...evaluateProps(processLogicBlock),
    ...evaluateLogic(processLogicBlock),
    ...evaluateManipulatorM(processLogicBlock),
    ...evaluateManipulatorC(processLogicBlock),
};

let evaluate = (data: any, obj: any) => {
    return processLogicBlock(data, obj);
};

export {
    evaluate
}