import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

function StudentList(props) {
    const exams = props.students.students && props.students.students.length > 0 && props.students.students.map((item) => {
        return (
            <tr key={item._id}>
                <th scope="row">{item.studentId}</th>
                <td>{item.examCode}</td>
                <td>{item.startTime}</td>
                <td>
                    <Button>
                        {"Download"}
                    </Button>
                </td>
            </tr>
        )
    });

    return (
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

/*
const mapDispatchToProps = dispatch => {
    return {
        getStudentList: (examId) => {
            dispatch(getStudentList(examId))
        },
    }
}
*/

export default connect(mapStateToProps, null)(StudentList);