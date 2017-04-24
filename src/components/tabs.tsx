import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ReactComponentBase, BasicComponent } from './react-component';

export interface TabProps extends React.Props<any> {
    isActive?: boolean;
    tabId?: number;
    className?: string;
    style?: any;
    onTabClick?: Function;
}

interface TabsProps extends React.Props<any> {
    isActive?: boolean;
    activeTab: number;
    className?: string;
    ripple: boolean;
    onChange: Function;
}

export class Tab extends React.Component<TabProps, any> {
    static defaultProps = {
        style: {}
    }

    handleClick(e) {
        this.props.onTabClick(this.props.tabId);
    }

    render() {
        var { isActive, className, tabId, onTabClick, style } = this.props;

        var classes = classNames('mdl-tabs__tab', {
            'is-active': isActive
        }, className);

        style.cursor = 'pointer';

        return <a className={classes} onClick={this.handleClick.bind(this)} style={style}>{this.props.children}</a>;
    }
}

export class Tabs extends ReactComponentBase<TabsProps, any> {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        children: React.PropTypes.arrayOf(function(props, propName, componentName) {
            var prop = props[propName];
            if (prop.type !== Tab) {
                return new Error('`' + componentName + '` only accepts `Tab` as children.');
            }
        })
    }

    static defaultProps = {
        activeTab: 0,
        ripple: true
    }

    handleClickTab = (tabId) => {
        this.props.onChange(tabId);
    }

    render() {
        let that = this;
        var { activeTab, className, onChange, ripple } = this.props;

        var classes = classNames('mdl-tabs mdl-js-tabs', {
            'mdl-js-ripple-effect': ripple
        }, className);

        return (
            <div className={classes} >
                <div className="mdl-tabs__tab-bar">
                    {React.Children.map(this.props.children, (child: any, index) => {
                return React.cloneElement(child, {
                    tabId: index,
                    isActive: index === activeTab,
                    onTabClick: that.handleClickTab
                });
            }) }
                    </div>
                <div className="react-mdl-hack" id="undefined" />
                    </div>
        );
    }
}