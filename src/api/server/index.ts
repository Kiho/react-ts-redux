export const BASE_URL = 'http://localhost:8087';

const headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'OPTIONS': ''
};

function getTimestamp() {
    return 't=' + new Date().getTime();
}

export function postLogin(path, data) {
    return fetch(BASE_URL + path, {
        method: 'post',
        body: data
    }).then(response => response.json());
}

export function post(path, data) {
    var url = BASE_URL + '/api/' + path + '/';
    const method = (data.id > 0) ? 'put' : 'post';
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    }); 
}

export function remove(path, id) {
    var url = BASE_URL + '/api/' + path + '/' + id;
    return fetch(url, {
        method: 'delete',
        headers: headers,
    }); 
}

export function getList(path, p) {
    var url = BASE_URL + '/api/' + path + "/?" + getTimestamp();
    if (p) {
        url += "&page=" + p.page + "&size=" + p.size + "&sortby=" + p.colName + "&direction=" + p.direction;
    }
    return fetch(url, {
        method: 'get',
        headers: headers,
    }); 
}

export function getById(path, id) {
    var url = BASE_URL + '/api/' + path + '/' + id + "/?" + getTimestamp();
    return fetch(url, {
        method: 'get',
        headers: headers,
    }); 
}