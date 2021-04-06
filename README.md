# qz-evaluator


# DOM

## Installation and usage

```shell

```

Usage in browser:

```javascript
const block = QzEvaluatorDom.blockly(document.getElementById('evaluator'), {
    autosave: true,
    readonly: false,
});
let logicBlock = block.getValue();
```

## API

### blockly

```javascript
_.blockly(domElement, option);
```

Arguments:

| argument        | type                                  | function                               |
| --------------- | ------------------------------------- | -------------------------------------- |
| domElement      | DOM Element                           | DOM element to render evaluator dom    |
| option.autosave | boolean                               | if true, evaluator will save changes to localstorage |
| option.readonly | boolean                               | if true, no changes can be made on dom |
| option.evalMode | "", "boolean", "number"               | determine which can be accepted as return value. Supported value is boolean, number or empty (all variable type) |


Returns:

```
QzEvaluator block object
```

### blockObject.parseYaml
### blockObject.parseJson
### blockObject.getValue
### blockObject.getYaml

# Evaluator

## Installation and usage

Installation using npm

```shell
npm i @fendy3002/qz-evaluator
```

Installation using yarn
```shell
yarn add @fendy3002/qz-evaluator
```

Usage in Node.js:

```javascript
import { fromJSON } from '@fendy3002/qz-evaluator';

let logicBlock = {
    "$m_sum": [
        {
            "$array_handle": {
                "source": {
                    "$prop_array": "Sales"
                },
                "operation": "map",
                "handler": {
                    "$prop_number": "each.Value"
                }
            }
        }
    ]
};
let data = {
    "FirstName": "Brad",
    "LastName": "Gibson",
    "Birth": "1993-07-20",
    "Rank": 3,
    "Sales": [
        { "Month": 0, "Value": 1000 },
        { "Month": 1, "Value": 1500 },
        { "Month": 2, "Value": 2000 },
        { "Month": 3, "Value": 3000 }
    ]
};

let evaluationResult = fromJSON(logiBlock).evaluate(data); // 7500
```
