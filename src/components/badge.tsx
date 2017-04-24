import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import { PropTypes } from 'react';
import { ReactComponentBase, cloneChildren } from './react-component';
import { BadgeProps } from 'mdl-react';

export class Badge extends ReactComponentBase<BadgeProps, any> {
    render() {
        const { className, children, text, overlap, noBackground } = this.props;

        // No badge if no children
        if (!React.Children.count(children)) return null;

        const element = typeof children === 'string'
            ? <span>{children}</span>
            : React.Children.only(children);

        // No text -> No need of badge
        if (text === null || typeof text === 'undefined') return element;

        let classes = classNames('mdl-badge', {
            'mdl-badge--overlap': !!overlap,
            'mdl-badge--no-background': !!noBackground
        }, className);

        let source = element as JSX.Element;
        return React.cloneElement(source, {
            className: classNames(classes, source.props && source.props.className),
            'data-badge': text
        }) as any;
    }
}