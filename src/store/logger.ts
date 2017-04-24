import * as createLogger from 'redux-logger';
// import immutableToJS from '../utils/immutable-to-js';

//const logger = createLogger({
//    collapsed: true,
//    stateTransformer: (state) => {
//        return immutableToJS(state);
//    },
//    predicate: (getState, { type }) => {
//        return type !== 'redux-form/BLUR' &&
//            type !== 'redux-form/CHANGE' &&
//            type !== 'redux-form/FOCUS' &&
//            type !== 'redux-form/TOUCH';
//    },
//});

const logger = createLogger({
    collapsed: true,
    // stateTransformer: (state) => {
    //     return immutableToJS(state);
    // },
    predicate: (getState, { type }) => {
        return type !== 'rrf/blur' &&
            type !== 'rrf/change' &&
            type !== 'rrf/focus' &&
            type !== 'rrf/touch';
    },
});

export default logger;
