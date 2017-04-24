import * as React from 'react';
import {PropTypes} from 'react';
import * as classNames from 'classnames';
import { shadows, clamp } from './react-component';

import { GridProps, CellProps }  from 'mdl-react';

export const Grid = (props: GridProps) => {
    const { noSpacing, className, children, component, shadow } = props;
    //, ...otherProps
    const hasShadow = typeof shadow !== 'undefined';
    const shadowLevel = clamp(shadow || 0, 0, shadows.length - 1);

    const classes = classNames('mdl-grid', {
        'mdl-grid--no-spacing': noSpacing,
        [shadows[shadowLevel]]: hasShadow
    }, className);

    return React.createElement((component || 'div') as any, {
        className: classes, //...otherProps
    }, children);
};

/* eslint-disable react/no-multi-comp */
export const Cell: any = (props: CellProps) => {
    const { align, className, children, col, phone, tablet, component,
        hideDesktop, hidePhone, hideTablet, shadow } = props;
    // , ...otherProps 
    const hasShadow = typeof shadow !== 'undefined';
    const shadowLevel = clamp(shadow || 0, 0, shadows.length - 1);

    const classes = classNames('mdl-cell', {
        [`mdl-cell--${col}-col`]: true,
        [`mdl-cell--${phone}-col-phone`]: typeof phone !== 'undefined',
        [`mdl-cell--${tablet}-col-tablet`]: typeof tablet !== 'undefined',
        [`mdl-cell--${align}`]: typeof align !== 'undefined',
        'mdl-cell--hide-desktop': hideDesktop,
        'mdl-cell--hide-phone': hidePhone,
        'mdl-cell--hide-tablet': hideTablet,
        [shadows[shadowLevel]]: hasShadow
    }, className);

    return React.createElement((component || 'div') as any, {
        className: classes, // ...otherProps       
    }, children);
};
