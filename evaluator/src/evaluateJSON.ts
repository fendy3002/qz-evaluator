import * as types from './types';
let logicBlocks: any = {
    
};
let processLogicBlock: types.ProcessLogicBlock = (data, obj: any) => {
    for (let key of Object.keys(obj)) {
        logicBlocks[key]?.(data, obj);
    }
};
let evaluate = (data: any, obj: any) => {

};

export {
    evaluate
}