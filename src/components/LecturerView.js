import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/authAction';
import NavBar from '../components/NavBar';

function LecturerView(props) {
    return (
        <div>
            <NavBar />
            <Link to="/" onClick={() => props.logout()}>
                <button type="button" className="btn btn-primary">
                    Logout
                </button>
            </Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(LecturerView);