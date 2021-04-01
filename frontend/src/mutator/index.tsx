import * as and_or from './and_or';
import * as sum from './sum';
import * as ifs from './ifs';
import * as array from './array';
import * as s_join from './s_join';

export {
    and_or,
    sum
};
export const register = (registerMutator) => {
    and_or.register(registerMutator);
    sum.register(registerMutator);
    ifs.register(registerMutator);
    array.register(registerMutator);
    s_join.register(registerMutator);
};