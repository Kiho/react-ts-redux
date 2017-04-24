import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import { ReactComponentBase } from './react-component';
import { ButtonProps } from 'mdl-react';

export class Button extends ReactComponentBase<ButtonProps, any> {
    static displayName = "Button";

    buttonClasses = 'mdl-button mdl-js-button';

    onClick: React.MouseEventHandler;

    render() {
        var { accent, className, colored, text, disabled,
            primary, raised, ripple, component, href, onClick, id,
            children } = this.props;

        if (this.onClick) {
            onClick = this.onClick;
        }
        var buttonClasses = classNames(this.buttonClasses, {
            'mdl-js-ripple-effect': ripple,
            'mdl-button--raised': raised,
            'mdl-button--colored': colored,
            'mdl-button--primary': primary,
            'mdl-button--accent': accent
        }, className);

        component = component || (href ? 'a' : 'button');
        if (text)
            children = text;

        return React.createElement(component, {
            className: buttonClasses,
            onClick,
            href,
            id,
            value: text,
            disabled
        }, children);
    }
}

//interface FABButtonProps extends ButtonProps {
//    mini?: boolean;
//}

export class FABButton extends Button {
    constructor(props) {
        super(props);

        this.buttonClasses = classNames('mdl-button--fab', {
            'mdl-button--mini-fab': this.props.mini
        }, this.buttonClasses);
    }
}