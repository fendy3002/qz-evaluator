
const safeParseFloat = (value: any) => {
    if (typeof value == "number") {
        return value;
    }
    else if (typeof value == "string") {
        let parseResult = Number(value);
        if (isNaN(parseResult)) {
            return null;
        }
        return parseResult;
    }
    else {
        return value * 1;
    }
};
export {
    safeParseFloat
};