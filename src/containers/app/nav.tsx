import * as React from 'react';

import { Spacer, Navigation, Icon } from '../../components';
// Router
import { Link, IndexLink } from "react-router";

class NavIcon extends React.Component<{ name: string }, {}> {
    render() {
        return <Icon className="mdl-color-text--blue-grey-400" name={this.props.name} />;
    }
}

export default React.createClass({
    render: function () {
        return (
            <Navigation className="demo-navigation mdl-color--blue-grey-800">
                <IndexLink to="home"><NavIcon name="home" />Home</IndexLink>
                <Link to="department"><NavIcon name="recent_actors" />Departments</Link>
                <Link to="employee"><NavIcon name="account_box" />Employees</Link>
                <Link to="about"><NavIcon name="settings" />About</Link>

                <Spacer />
                <a>
                    <NavIcon name="help_outline" />
                    <span className="visuallyhidden">Help</span>
                </a>
            </Navigation>
        );
    }
})
