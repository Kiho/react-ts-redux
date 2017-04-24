// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

export const basicClassCreator = (displayName, defaultClassName, element = 'div') => {
    const fn = (props) => {
        const { className, children } = props;

        return React.createElement(element, {
            className: classNames(defaultClassName, className)
        }, children);
    };

    (fn as any).displayName = displayName;

    return fn;
};
