import * as React from 'react';
import * as Router from 'react-router';
import * as ReactTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';

import { Layout, Drawer, Content, Textfield, Menu, MenuItem, IconButton } from '../components';
import PageHeader from './app/page-header';
import HeaderAvatar from './app/header-avatar';
import Nav from './app/nav';
import { Alert } from '../components';

class App extends React.Component<any, any> {
    render() {
        const { children } = this.props;

        let content;
        // let content = isLoggedIn ? children : <LoginDialog />;
        content = (
            <Layout className="demo-layout" fixedHeader={true} fixedDrawer={true}>
                <PageHeader />
                <Drawer className="demo-drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <HeaderAvatar />
                    <Nav />
                </Drawer>
                <Content className="mdl-color--grey-100">
                    <div className="mdl-grid demo-content">
                        {children}
                    </div>
                </Content>
            </Layout>
        );
        return <div>{content}<Alert /></div>;
    }
}

export default App;