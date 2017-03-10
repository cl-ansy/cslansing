import React, { Component } from 'react';
import { Link } from 'react-router';


class Nav extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue lighten-2">
                    <a href="#" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/notebook'}>Notebook</Link></li>
                        {/*<li><a><i className="mdi mdi-facebook"/></a></li>
                        <li><a><i className="mdi mdi-github-circle"/></a></li>
                        <li><a><i className="mdi mdi-linkedin"/></a></li>*/}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
