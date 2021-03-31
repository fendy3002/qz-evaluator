// export type LogicBlock =
//     Blocks._string |
//     Blocks._number |
//     Blocks._and;

// export namespace Blocks {
//     export interface _string {
//         $string: string
//     };
//     export interface _number {
//         $number: number
//     };
//     export interface _and {
//         $and: LogicBlock[]
//     };
// };

export interface ProcessLogicBlock{
    (data: any, logicBlock: any): any
};

export interface Evaluator {
    evaluate: (data: any) => any,
    evaluateArray: (data: any[]) => any
};
export interface Service {
    fromJSON: (logicBlock: any) => Evaluator,
    fromYAML: (logicYaml: string) => Evaluator
};