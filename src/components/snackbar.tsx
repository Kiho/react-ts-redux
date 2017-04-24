import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ReactComponentBase, BasicComponent } from './react-component';

interface IAriaProps extends React.Props<any> {
    ariaLive?: string;
    ariaAtomic?: boolean;
    ariaRelevant?: string;
}

export class Snackbar extends ReactComponentBase<IAriaProps, any> {
    static defaultProps = {
        ariaLive: "assertive",
        ariaAtomic: true,
        ariaRelevant: "text"
    }

    render() {
        return (
            <div {...this.props} className="mdl-js-snackbar mdl-snackbar" >
                <div className="mdl-snackbar__text"></div>
                <button className="mdl-snackbar__action" type="button"></button>
                </div>);
    }
}