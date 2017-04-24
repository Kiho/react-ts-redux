import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import { ReactComponentBase, BasicComponent } from './react-component';
import { ElementProps } from 'mdl-react';

export interface CheckBoxProps extends ElementProps {
    checked?: boolean;
    disabled?: boolean;
    defaultChecked?: boolean;
    label?: string;
    onChange?: React.MouseEventHandler;
    checkedLink?: any;
}

export class CheckBox extends ReactComponentBase<CheckBoxProps, any> {
    constructor(props) {
        super(props);
    }

    node: any;

    componentDidUpdate(prevProps) {
        if (!this.node) {
            this.node = ReactDOM.findDOMNode(this);
            this.node.MaterialCheckbox.checkToggleState();
        }
        if (this.props.disabled !== prevProps.disabled) {
            this.node.MaterialCheckbox.checkDisabled();
        }
    }

    //_handleChange(event) {
    //    this.props.onChange(event);
    //    return true;
    //    // this.setState({ checked: event.target.checked }); // onChange={this._handleChange.bind(this) }
    //}

    render() {
        var { checked, disabled, id, label, checkedLink, defaultChecked, onChange } = this.props;
        var labelOrId = (label || id);
        if (!labelOrId) {
            console.warn('Label or ID must be set.');
        }
        var inputId = 'checkbox-' + labelOrId.toString().replace(/\s+/g, '');

        return (
            <label className="mdl-checkbox mdl-js-checkbox" htmlFor={inputId}>
                <input
                    type="checkbox"
                    id={inputId}
                    className="mdl-checkbox__input"
                    disabled={disabled}
                    checked={checked}
                    onChange={onChange}
                    checkedLink={checkedLink}
                    />
                    {label ? <span className="mdl-checkbox__label">{label}</span> : null}
                </label>
        );
    }
}
