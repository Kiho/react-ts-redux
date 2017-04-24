/// <reference path="./basic-class-creator.tsx" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

import { basicClassCreator } from './basic-class-creator';
import { Button } from './button';

declare var dialogPolyfill;

const prevent = (event) => event.preventDefault

export const DialogContent = basicClassCreator('DialogContent', 'mdl-dialog__content');

interface IModal {
    showModal: () => void;
    close: () => void;
    form?: HTMLFormElement;
}

export interface DialogProps extends React.Props<any> {
    className?: string;
    onCancel?: EventListener;
    open?: boolean;
}

export class Dialog extends React.Component<DialogProps, any> {
    //static propTypes = {
    //    className: PropTypes.string,
    //    onCancel: PropTypes.func,
    //    open: PropTypes.bool
    //};
    modal: IModal;

    form: HTMLFormElement;

    refs: {
        [string: string]: any;
        dialog: HTMLElement;
    }

    static defaultProps = {
        onCancel: prevent
    };

    componentDidMount() {
        this.refs.dialog.addEventListener('cancel', this.props.onCancel);
        if (this.props.open) {
            this.modal.showModal();
        }
        //setTimeout(() => {
        //    this.modal.form = ReactDOM.findDOMNode(this).querySelector('form') as HTMLFormElement;
        //}, 500);
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            if (!this.modal) {
                this.modal = ReactDOM.findDOMNode(this) as any;
            }
            if (this.props.open) {
                this.modal.showModal();

                // display the dialog at the right location
                // needed for the polyfill, otherwise it's not at the right position
                const bodyHeight = document.body.clientHeight;
                const dialogHeight = this.refs.dialog.clientHeight;
                this.refs.dialog.style.position = 'fixed';
                this.refs.dialog.style.top = `${(bodyHeight - dialogHeight) / 2}px`;
            }
            else {
                this.modal.close();
            }
        }
    }

    componentWillUnmount() {
        this.refs.dialog.removeEventListener('cancel', this.props.onCancel);
    }

    render() {
        // We cannot set the `open` prop on the Dialog if we manage its state manually with `showModal`,
        // this the disabled eslint rule
        // eslint-disable-next-line no-unused-vars
        const { className, onCancel, children } = this.props;
        const classes = classNames('mdl-dialog', className);

        return (
            <dialog ref="dialog" className={classes}>
                {children}
            </dialog>
        );
    }
}

export interface DialogActionProps extends React.Props<any> {
    className?: string;
    fullWidth?: boolean;
}

export const DialogActions = (props: DialogActionProps) => {
    const { className, fullWidth, children } = props;

    const classes = classNames('mdl-dialog__actions', {
        'mdl-dialog__actions--full-width': fullWidth
    }, className);

    return (
        <div {...this.props} className={classes} >
            {children}
        </div>
    );
};

export interface DialogTitleProps extends React.Props<any> {
    className?: string;
    component?: any;
}

export const DialogTitle = (props) => {
    const { className, component, children } = props;

    return React.createElement(component || 'h4', {
        className: classNames('mdl-dialog__title', className)
    }, children);
};

export const Alert = (props: DialogProps) => {
    const { className, open } = props;
    return (
        <Dialog open={open}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <p>Content</p>
            </DialogContent>
            <DialogActions>
                <Button className="close">OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export function showDialog(message, afterClose?: () => void) {
    var dialog: any = document.querySelector('dialog');
    if (!dialog.showModal) {
        if (!dialogPolyfill) {
            alert(message);
            return;
        }
        dialogPolyfill.registerDialog(dialog);
    }
    if (!dialog.clickEventAdded) {
        dialog.querySelector('.close').addEventListener('click', function () {
            dialog.close();
            if (afterClose) {
                afterClose();
            }
        });
        dialog.clickEventAdded = true;
    }
    dialog.querySelector('.mdl-dialog__content').innerHTML = message;
    dialog.showModal();
}