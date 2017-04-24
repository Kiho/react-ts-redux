import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ReactComponentBase, BasicComponent } from './react-component';

export interface ISpinnerProps {
    isActive?: boolean;
    singleColor?: boolean;
    className?: string;
}

export class Spinner extends ReactComponentBase<ISpinnerProps, any> {
    render() {
        var { className, singleColor, isActive } = this.props;

        var classes = classNames('mdl-spinner mdl-js-spinner', {
            'mdl-spinner--single-color': singleColor,
            'is-active': isActive
        }, className);

        return <div className={classes}></div>;
    }
}
