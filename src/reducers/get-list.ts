import { EntityType } from '../model';
import {
    GET_LIST_PENDING,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR,
    GET_LIST_RESET,
} from '../constants';

const INITIAL_STATE = {
    item: {},
    data: {},
    hasError: false,
    isLoading: false,
    message: ''
};

function listFor(resource: EntityType) {
    return function (state = INITIAL_STATE,
        action = { type: '', payload: null, path: null }) {
        const entity = resource;
        if (!action.path || action.path != entity) {
            return state;
        }
        switch (action.type) {

            case GET_LIST_PENDING:
                return Object.assign({}, state, {
                    data: {},
                    hasError: false,
                    isLoading: true,
                    message: ''
                });

            case GET_LIST_SUCCESS:
                return Object.assign({}, state, {
                    data: action.payload,
                    hasError: false,
                    isLoading: false,
                });

            case GET_LIST_ERROR:
                return Object.assign({}, state, {
                    message: action.payload.message,
                    hasError: true,
                    isLoading: false,
                });

            case GET_LIST_RESET:
                return Object.assign({}, state, { INITIAL_STATE });

            default:
                return state;
        }
    }
}

export default listFor;
