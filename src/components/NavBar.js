import React from 'react';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href="localhost:3000" className="navbar-brand">
                sophon
            </a>

            <form className="justify-content-end form-inline col">
                <input className="form-control mr-sm-2" type="email" placeholder="Email" />
                <input className="form-control mr-sm-2" type="password" placeholder="Password" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">LOGIN</button>
            </form>
        </nav>
    )
}

export default NavBar;