import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { downloadStudentSubmission } from '../actions/studentAction';

function StudentList(props) {
    function handleDownloadSubmission(studentId, submissionLocation) {
        console.log(`download ${studentId}`)
        props.downloadStudentSubmission(studentId, submissionLocation);
    }

    const exams = props.students.students && props.students.students.length > 0 && props.students.students.map((item) => {
        return (
            <tr key={item._id}>
                <th scope="row">{item.studentId}</th>
                <td>{item.examCode}</td>
                <td>{item.startTime}</td>
                <td>
                    {item.submissionLocation ? 
                        <Button onClick={() => {handleDownloadSubmission(item.studentId, item.submissionLocation)}}>
                            DOWNLOAD
                        </Button>
                    :
                    'No Submission Yet'
                    }
                </td>
            </tr>
        )
    });

    return (
        props.students.isFetching ?
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        :
        <table className="table">
            <thead className="thead">
                <tr>
                    <th scope="col">Student ID</th>
                    <th scope="col">Exam Code</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">Download Submission</th>
                </tr>
            </thead>
            <tbody>
                {exams}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => {
    return {
        students: state.students
    };
};

const mapDispatchToProps = dispatch => {
    return {
        downloadStudentSubmission: (studentId, submissionLocation) => {
            dispatch(downloadStudentSubmission(studentId, submissionLocation))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);