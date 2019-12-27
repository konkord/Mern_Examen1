import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component{
    render()
    {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Admin</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/mock" className="nav-link">Mock</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createMovie" className="nav-link">Add Users</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

