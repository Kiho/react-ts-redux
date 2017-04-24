import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ReactComponentBase, BasicComponent } from './react-component';

export interface CardProps extends React.Props<any> {
    style?: any;
    shadow?: number;
    className?: string;
    title?: string;
    height?: number;
    width?: number;
}

export class Card extends ReactComponentBase<CardProps, any> {
    displayName = 'MDL:Card';

    static defaultProps = {
        style: {}
    }

    render() {
        var classes = {
            'mdl-card': true,
        };

        classes['mdl-shadow--' + this.props.shadow + 'dp'] = true;
        let title = this.props.title ? <CardTitle>{this.props.title}</CardTitle> : null;
        var style = this.props.style;

        style.height = this.props.height ? this.props.height : style.height;
        style.width = this.props.width ? this.props.width : style.width;

        return (            
            <div className={classNames(classes) } style={style}>
                {title}
                {this.props.children}
                </div>
        );        
    }
}

export interface CardTitleProps extends React.Props<any> {
    className?: string;
    expand?: boolean;
}

export class CardTitle extends ReactComponentBase<CardTitleProps, any> {

    render() {
        const { className, children, expand } = this.props;

        const classes = classNames('mdl-card__title', {
            'mdl-card--expand': expand
        }, className);

        const title = typeof children === 'string'
            ? React.createElement('h2', { className: 'mdl-card__title-text' }, children)
            : children;

        return (
            <div className={classes}>
                {title}
                </div>
        );
    }
}