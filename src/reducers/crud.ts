import { EntityType, createNew } from '../model';
import {
    GET_BY_ID_PENDING,
    GET_BY_ID_SUCCESS,
    GET_BY_ID_ERROR,

    POST_PENDING,
    POST_SUCCESS,
    POST_ERROR,

    PUT_PENDING,
    PUT_SUCCESS,
    PUT_ERROR,

    DELETE_PENDING,
    DELETE_SUCCESS,
    DELETE_ERROR,

    CREATE_NEW,
    SET_FIELD_VALUE
} from '../constants';

interface IFetchState {
    item?: Object;
    hasError: boolean;
    isLoading: boolean;
    message: string;
}

const INITIAL_STATE: IFetchState = {
    item: {},
    hasError: false,
    isLoading: false,
    message: ''
};

const onFetchPending = (item?) => ({
    item: item,
    hasError: false,
    isLoading: true,
    message: ''
});

const onFetchSuccess = (payload) => ({
    item: payload,
    hasError: false,
    isLoading: false,
    message: ''
});

const onFetchError = (payload) => ({
    hasError: true,
    isLoading: false,
    message: payload.message
});

const onPostPending = () => ({
    hasError: false,
    isLoading: true,
    message: ''
});

const onPostSuccess = () => ({
    hasError: false,
    isLoading: false,
    message: ''
});

const onCreateNew = (path: EntityType) => ({
    item: createNew(path),
    hasError: false,
    isLoading: false,
    message: ''
});

function merge(state, data) {
    return Object.assign({}, state, data);
}

function crudFor(resource: EntityType) {
    return function(state = INITIAL_STATE,
        action = { type: '', payload: null, path: null }) {
        const entity = resource;
        if (!action.path || action.path != entity) {
            return state;
        }
        let data;
        switch (action.type) {

            case GET_BY_ID_PENDING:
                data = onFetchPending({});
                return merge(state, data);

            case GET_BY_ID_SUCCESS:
                data = onFetchSuccess(action.payload);
                return merge(state, data);

            case GET_BY_ID_ERROR:
                data = onFetchError(action.payload);
                return merge(state, data);

            case POST_PENDING:
                data = onPostPending();
                return merge(state, data);

            case POST_SUCCESS:                
                data = onFetchSuccess(action.payload);
                return merge(state, data);

            case POST_ERROR:
                data = onFetchError(action.payload);
                return merge(state, data);

            case PUT_PENDING:
                data = onPostPending();
                return merge(state, data);

            case PUT_SUCCESS:
                data = onFetchSuccess(action.payload);
                return merge(state, data);

            case PUT_ERROR:
                data = onFetchError(action.payload);
                return merge(state, data);

            case DELETE_PENDING:
                data = onFetchPending();
                return merge(state, data);

            case DELETE_SUCCESS:
                data = onFetchSuccess({});
                return merge(state, data);

            case DELETE_ERROR:
                data = onFetchError(action.payload);
                return merge(state, data);

            case CREATE_NEW:
                data = onCreateNew(resource);           
                return merge(state, data);

            case SET_FIELD_VALUE:
                data = { item: Object.assign({}, state.item, action.payload) }; 
                return merge(state, data);

            default:
                return state;
        }
    }
}

export default crudFor;
