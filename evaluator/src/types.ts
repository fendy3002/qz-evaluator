export interface LogicBlock {

};

export interface Evaluator {
    evaluate: (data: any) => any,
    evaluateArray: (data: any[]) => any
};
export interface Service {
    fromJSON: (logicBlock: LogicBlock) => Evaluator,
    fromYAML: (logicYaml: string) => Evaluator
};