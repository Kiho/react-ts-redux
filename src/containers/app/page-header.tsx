import * as React from 'react';
import { Header, Textfield, Menu, MenuItem, IconButton, Spacer } from '../../components';

export default function PageHeader() {
    return (
        <Header title="Home" className="demo-header mdl-color--grey-100 mdl-color-text--grey-600">
            <Textfield
                label="Search"
                expandable={true}
                expandableIcon="search" />
            <IconButton name="more_vert" id="nav-menu-top-right" />
            <Menu target="nav-menu-top-right" align="right">
                <MenuItem>About</MenuItem>
                <MenuItem>Contact</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </Header>
    )
}

