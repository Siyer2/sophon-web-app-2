import React from 'react';

import NavBar from './NavBar';
import StudentList from './StudentList';

function ExamView() {
    return (
        <div>
            <NavBar />
            <div className="container">
                <StudentList />
            </div>
        </div>
    )
}

export default ExamView;