import * as React from 'react';
import * as classNames from 'classnames';
import { ReactComponentBase, BasicComponent } from './react-component';

function cloneChildren(children, props) {
    return React.Children.map(children, (child: React.DOMElement<any, any>) => {
        var p = typeof props === 'function' ? props(child) : props;
        return React.cloneElement(child, p);
    });
}

interface DrawerProps extends React.Props<any> {
    title?: string;
    className?: string;
}

interface NavigationProps extends DrawerProps {
    route?: string;
    menu?: any;
}

interface HeaderRowProps extends DrawerProps {
    location?: string;
}

interface HeaderTabProps extends DrawerProps {
    ripple?: boolean;
}

interface HeaderProps extends HeaderRowProps {
    scroll?: boolean;
    transparent?: boolean;
    waterfall?: any;
}

interface LayoutProps extends React.Props<any> {
    className?: string;
    fixedDrawer?: boolean;
    fixedHeader?: boolean;
    fixedTabs?: boolean;
}

export class Spacer extends BasicComponent {
    constructor(props) {
        super(props);
        this.defaultClassName = 'mdl-layout-spacer';
    }
}

export class Content extends BasicComponent {
    constructor(props) {
        super(props);

        this.element = 'main';
        this.defaultClassName = 'mdl-layout__content';
    }
}

export class Drawer extends ReactComponentBase<DrawerProps, any> {
    render() {
        var { className, title } = this.props;
        var classes = classNames('mdl-layout__drawer', className);

        return (
            <header  className={classes}>
                {title ? <span className="mdl-layout-title">{title}</span> : null}
                {this.props.children}
            </header >
        );
    }
}

export class Navigation extends ReactComponentBase<DrawerProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, children } = this.props;
        const classes = classNames('mdl-navigation', className);

        return (
            <nav {...this.props} className={classes}>
                {cloneChildren(children, (child) => ({
                    className: classNames({ 'mdl-navigation__link': child.type !== Spacer }, child.props ? child.props.className : null)
                })) }
            </nav>
        );
    }
}

export class HeaderRow extends ReactComponentBase<HeaderRowProps, any> {
    render() {
        var { className, title, location } = this.props;
        var classes = classNames('mdl-layout__header-row', className);

        return (
            <div className={classes}>
                {title ? <span className="mdl-layout-title">
                    <a href='index.html'>{title}</a></span> : null}
                {location && <span className="mdl-layout-title">&nbsp; {"/ " + location}</span> }
                <Spacer />
                {this.props.children}
            </div>
        );
    }
}

export class HeaderTabs extends ReactComponentBase<HeaderTabProps, any> {
    render() {
        var { className, ripple } = this.props;
        var classes = classNames('mdl-layout__tab-bar', {
            'mdl-js-ripple-effect': ripple !== false
        }, className);

        return (
            <div className={classes}>
                {cloneChildren(this.props.children, child => ({
                    className: classNames('mdl-layout__tab', child.props.className)
                })) }
            </div>
        );
    }
}

export class Header extends ReactComponentBase<HeaderProps, any> {
    render() {
        var { className, scroll, title, location, transparent, waterfall } = this.props;
        var classes = classNames('mdl-layout__header', {
            'mdl-layout__header--scroll': scroll,
            'mdl-layout__header--transparent': transparent,
            'mdl-layout__header--waterfall': waterfall
        }, className);

        var isRowOrTab = false;
        React.Children.forEach(this.props.children, (child: any) => {
            if (child && (child.type === HeaderRow || child.type === HeaderTabs)) {
                isRowOrTab = true;
            }
        });

        return (
            <header className={classes}>
                {isRowOrTab ? this.props.children : (
                    <HeaderRow title={title} location={location}>
                        {this.props.children}
                    </HeaderRow>
                ) }
            </header>
        );
    }
}

export class Layout extends ReactComponentBase<LayoutProps, any> {
    render() {
        var { className, fixedDrawer, fixedHeader, fixedTabs } = this.props;

        var classes = classNames('mdl-layout mdl-js-layout', {
            'mdl-layout--fixed-drawer': fixedDrawer,
            'mdl-layout--fixed-header': fixedHeader,
            'mdl-layout--fixed-tabs': fixedTabs
        }, className);

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}
