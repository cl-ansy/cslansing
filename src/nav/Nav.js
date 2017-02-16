import React, { Component } from 'react';

import 'mdi/css/materialdesignicons.min.css';


class Nav extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper indigo darken-3">
                    <a href="#" className="brand-logo right">Logo</a>
                    <ul id="nav-mobile" className="left">
                        <li><a><i className="mdi mdi-facebook"/></a></li>
                        <li><a><i className="mdi mdi-github-circle"/></a></li>
                        <li><a><i className="mdi mdi-linkedin"/></a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
