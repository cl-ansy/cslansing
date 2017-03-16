import React, { Component } from 'react';
// import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';


class Nav extends Component {

    render() {
        // const links = (
        //     <div>
        //         <Link to={'/notebook'}>Notebook</Link>
        //     </div>
        // );

        const rightIconStyles = { color: 'black', opacity: 1 };
        const rightIcons = (
            <div>
                <IconButton
                    iconClassName="mdi mdi-github-circle"
                    iconStyle={rightIconStyles}
                    href="https://github.com/cslansing"
                />
                <IconButton
                    iconClassName="mdi mdi-linkedin"
                    iconStyle={rightIconStyles}
                    href="https://www.linkedin.com/in/chris-lansing-747a2158/"
                />
            </div>
        );

        return (
            <AppBar
                title={'Chris Lansing'}
                showMenuIconButton={false}
                iconElementRight={rightIcons}
                style={{ backgroundColor: '' }}
                titleStyle={{ color: 'black' }}
            />
        );
    }
}

export default Nav;
