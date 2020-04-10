import React from 'react';

import NavBar from '../components/NavBar';
import ExamList from '../components/ExamList';

function LecturerView(props) {
    return (
        <div>
            <NavBar />
            <ExamList />
        </div>
    )
}

export default LecturerView;