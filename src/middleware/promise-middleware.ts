'use strict'

import isPromise from '../utils/is-promise';

export default function promiseMiddleware({ dispatch }) {
    return next => action => {
        if (!isPromise(action.payload)) {
            return next(action);
        }

        const { types, payload, meta, path } = action;
        const { promise, data } = payload;
        const [PENDING, FULFILLED, REJECTED] = types;

        /**
         * Dispatch the pending action
         */
        dispatch(Object.assign({},
            { type: PENDING },
            data ? { payload: data } : {},
            meta ? { meta } : {},
            path
        ));

        /**
         * If successful, dispatch the fulfilled action, otherwise dispatch
         * rejected action.
         */
        return promise.then(
            result => {
                dispatch({
                    type: FULFILLED,
                    payload: result,
                    meta,
                    path
                });
            },
            error => {
                dispatch({
                    type: REJECTED,
                    payload: error,
                    meta,
                    path
                });
            }
        );
    };
}
