import * as andMutator from './and';

export {
    andMutator
};
export const register = (registerMutator) => {
    andMutator.register(registerMutator);
};