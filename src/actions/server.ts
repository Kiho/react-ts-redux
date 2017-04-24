import * as Api from '../api/server/';
import {
    GET_LIST_PENDING,
    GET_LIST_SUCCESS,
    GET_LIST_ERROR,
    GET_LIST_RESET,

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
    SET_FIELD_VALUE,

    FORM_RESET,
} from '../constants';

//export function resetForm() {    
//    return {
//        type: GET_LIST_RESET,
//        form: 'project'
//    };
//}

export function getList(path) {
    return (dispatch, getState) => {
        return dispatch({
            types: [
                GET_LIST_PENDING,
                GET_LIST_SUCCESS,
                GET_LIST_ERROR,
            ],
            path: path,
            payload: {
                promise: Api.getList(path, null)
                    .then(res => res.json())
            },
        });
    };
}

export function getById(path, id) {
    return (dispatch, getState) => {
        return dispatch({
            types: [
                GET_BY_ID_PENDING,
                GET_BY_ID_SUCCESS,
                GET_BY_ID_ERROR,
            ],
            path: path,
            payload: {
                promise: Api.getById(path, id)
                    .then(res => res.json())
            },
        });
    };
}

export function post(path, item, callback?) {
    return (dispatch, getState) => {
        return dispatch({
            types: [
                POST_PENDING,
                POST_SUCCESS,
                POST_ERROR,
            ],
            path: path,
            payload: {
                promise: Api.post(path, item)
                    .then((res) => {
                        if (res.ok && callback) {
                            callback(path);
                        }
                        return res.json();
                    })
            },
        });
    };
}

export function put(path, item, callback?) {
    return (dispatch, getState) => {
        return dispatch({
            types: [
                PUT_PENDING,
                PUT_SUCCESS,
                PUT_ERROR,
            ],
            path: path,
            payload: {
                promise: Api.post(path, item)
                    .then((res) => {
                        if (res.ok && callback) {
                            callback(path);
                        }
                        return res.json();
                    }),
            },
        });
    };
}

export function remove(path, id, callback?) {
    return (dispatch, getState) => {
        return dispatch({
            types: [
                DELETE_PENDING,
                DELETE_SUCCESS,
                DELETE_ERROR,
            ],
            path: path,
            payload: {
                promise: Api.remove(path, id)
                    .then((res) => {
                        if (res.ok && callback) {
                            callback(path);
                        }
                        return res;
                    }),
            },
        });
    };
}

export function addNew(path: string) {
    return (dispatch) => {
        dispatch({
            type: CREATE_NEW,
            path: path
        });
    };
}

export function setFieldValue(path: string, item) {
    return (dispatch) => {
        dispatch({
            type: SET_FIELD_VALUE,
            path: path,
            payload: item
        });
    };
}