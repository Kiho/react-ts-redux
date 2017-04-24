import * as React from 'react';
import { Header, Spacer, Menu, MenuItem, IconButton } from '../../components';

export default function HeaderAvatar () {
    return (
        <header className="demo-drawer-header">
            <img src="img/home.png" className="demo-avatar" />
            <div className="demo-avatar-dropdown">
                <span>kiho @example.com</span>
                <Spacer />
                <IconButton name="arrow_drop_down" className="f14" id="accbtn" />
                <Menu target="accbtn" align="right">
                    <MenuItem>hello @example.com</MenuItem>
                    <MenuItem>info @example.com</MenuItem>
                    <MenuItem><i className="material-icons">add</i>Add another account...</MenuItem>
                </Menu>
            </div>
        </header>
    );
}
