import * as moment from 'moment';

const noAutoBindFuncs = ['constructor', 'render'];

export function componentAutoBind(obj, list?: string[]) {
    if (!list) {
        list = noAutoBindFuncs;
    }
    Object.getOwnPropertyNames(obj.constructor.prototype).forEach(function (func) {
        if (list.indexOf(func) === -1 && typeof obj[func] === 'function') {
            obj[func] = obj[func].bind(obj);
        }
    }, obj);
}

export function copyTo(source, target, excludes) {
    for (var attrname in source) {
        if (!excludes.hasOwnProperty(attrname)) {
            target[attrname] = source[attrname];
        }
    }
    return target;
}

export function formatDate(dtm, format) {
    if (dtm) {
        return moment(dtm).format(format);
    }
    return '';
}

// Read a page's GET URL variables and return them as an associative array.
export function getUrlVars() {
    var vars = [], hash: string[];
    var href = window.location.href;
    href = href.trim().slice(href.indexOf('?') + 1);
    if (href) {
        if (href.indexOf('#') > 0)
            href = href.substring(0, href.indexOf('#'));
        var hashes = href.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            let val = hash[1];
            vars[hash[0]] = val === undefined ? null : decodeURIComponent(val);
        }
    }
    return vars;
}

export function store(namespace: string, data?: any) {
    if (data) {
        return sessionStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = sessionStorage.getItem(namespace);
    return (store && JSON.parse(store));
}

export function copyData(objs: any[]) {
    if (!objs) return [];
    const newArray = [];
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        let newObj = {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
        newArray.push(newObj);
    }
    return newArray;
}

export function extend(...objs: any[]): any {
    var newObj = {};
    for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}

export function omit(source, ...excludes) {
    const target = {};
    for (var key in source) {
        if (source.hasOwnProperty(key) && excludes.indexOf(key) == -1) {
            target[key] = source[key];
        }
    }
    return target;
}

export function isNumber(value: string) {
    return !isNaN(Number(value));
}

export function previousMonday() {
    return moment().startOf('week').subtract(6, 'day');
}

export function getUrl(name, id) {
    return '/' + name + '/view/' + id;
}

export function getArrayData(list) {
    return Array.isArray(list.data) ? list.data : [];
}

// https://www.stevefenton.co.uk/2014/07/creating-typescript-classes-dynamically/
export class InstanceLoader {
    static getInstance<T>(context: Object, name: string, ...args: any[]): T {
        var instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T>instance;
    }
}