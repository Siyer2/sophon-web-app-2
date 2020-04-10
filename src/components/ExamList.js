import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authAction';

function ExamList() {
    return (
        <Link to="/" onClick={() => logout()}>
            <button type="button" className="btn btn-primary">
                Logout
            </button>
        </Link>
    )
}

export default ExamList;