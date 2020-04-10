import React from 'react';
import { connect } from 'react-redux';
import {
    login
} from '../actions/authAction';

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
                {props.auth.isFetching ? 
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                : 'LOGIN'}
            </button>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a href="localhost:3000" className="navbar-brand">
                sophon
            </a>

            <div className="justify-content-end form-inline col">
                <input onChange={(e) => { handleChange(e, 'email') }} className="form-control mr-sm-2" type="email" placeholder="Email" />
                <input onChange={(e) => { handleChange(e, 'password') }} className="form-control mr-sm-2" type="password" placeholder="Password" />
                <SubmitButton />
            </div>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);