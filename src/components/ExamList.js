import React from 'react';
import { Link } from 'react-router-dom';

function ExamList() {
    return (
        <Link to="/">
            <button type="button" className="btn btn-primary">
                Logout
            </button>
        </Link>
    )
}

export default ExamList;