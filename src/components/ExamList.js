import React from 'react';
import { connect } from 'react-redux';
import { getStudentList } from '../actions/studentAction';
import { history } from '../helpers/history';
import {
    Input, 
    LockOpen, 
    Lock, 
    Delete
} from '@material-ui/icons';
import {
    Button
} from 'react-bootstrap';

function ExamList(props) {
    function examClicked(examId) {
        props.getStudentList(examId);
        history.push(`exams/${examId}`);
    }

    const exams = props.exams.exams && props.exams.exams.length > 0 && props.exams.exams.map((item) => {
        return (
            <tr key={item._id + item.examCode}>
                <th scope="row">{item.examName}</th>
                <td>{item.examCode}</td>
                <td>{item.isClosed ? <Lock /> : <LockOpen />}</td>
                <td>
                    <Button variant="outline-success" onClick={() => { examClicked(item._id, item.examCode) }}>
                        <Input />
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger">
                        <Delete />
                    </Button>
                </td>
            </tr>
        )
    });

    return (
        props.exams.isFetching ? 
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        :
        <table className="table">
            <thead className="thead">
                <tr>
                    <th scope="col">Exam</th>
                    <th scope="col">Exam Code</th>
                    <th scope="col">Open</th>
                    <th scope="col">View Submissions</th>
                    <th scope="col">Delete</th>
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
        exams: state.exams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getStudentList: (examId) => {
            dispatch(getStudentList(examId))
        }, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);