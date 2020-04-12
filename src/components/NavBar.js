import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    login, 
    logout
} from '../actions/authAction';
import { userExists } from '../helpers/userExists';

var state = {};

function handleChange(event, name) {
    state[name] = event.target.value;
}

function NavBar(props) {
    function loginClicked() {
        props.login(state.email, state.password);
    }

    function SubmitButton() {
        return (
            <button onClick={() => { loginClicked() }} className="btn btn-outline-success my-2 my-sm-0" type="submit">
                {props.auth.isLoggingIn ? 
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                : 'LOGIN'}
            </button>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href={userExists() ? '/exams' : '/'} className="navbar-brand">
                sophon
            </a>

            <div className="justify-content-end form-inline col">
                <button type="button" className="btn btn-success my-2 my-sm-0">
                    New Exam
                </button>
            </div>

            {userExists() && window.location.pathname !== '/'
            ?
            <Link className="justify-content-end form-inline col" to="/" onClick={() => props.logout()}>
                <button type="button" className="btn btn-primary">
                    Logout
                </button>
            </Link>
            :
            <div className="justify-content-end form-inline col">
                <input onChange={(e) => { handleChange(e, 'email') }} className="form-control mr-sm-2" type="email" placeholder="Email" />
                <input onChange={(e) => { handleChange(e, 'password') }} className="form-control mr-sm-2" type="password" placeholder="Password" />
                <SubmitButton />
            </div>}
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => {
            dispatch(login(email, password))
        }, 
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);