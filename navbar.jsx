import React from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item"><a href="#" className="navbar-link">Home</a></li>
                    <li className="navbar-item"><a href="#" className="navbar-link">About</a></li>
                    <li className="navbar-item"><a href="#" className="navbar-link">Team</a></li>
                </ul>
                <div className="search-panel">
                    <input type="text" placeholder="Search" />
                    <button>Search</button>
                </div>
            </nav>
        );
    }
}

export default NavBar;
