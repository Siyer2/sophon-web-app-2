import React from 'react';

import NavBar from '../components/NavBar';
import ExamList from '../components/ExamList';

function LecturerView() {
    return (
        <div>
            <NavBar />
            <div className="container">
                <ExamList />
            </div>
        </div>
    )
}

export default LecturerView;