import React from 'react';
import { connect } from 'react-redux';
import { getStudentList } from '../actions/studentAction';
import { toggleCloseExam } from '../actions/examAction';
import { history } from '../helpers/history';
import {
    Input, 
    LockOpen, 
    Lock, 
    Delete
} from '@material-ui/icons';
import {
    Button, 
    OverlayTrigger, 
    Tooltip
} from 'react-bootstrap';

function ExamList(props) {
    function examClicked(examId) {
        props.getStudentList(examId);
        history.push(`exams/${examId}`);
    }

    function toggleCloseExam(examId) {
        props.toggleCloseExam(examId);
    }

    const exams = props.exams.exams && props.exams.exams.length > 0 && props.exams.exams.map((item) => {
        return (
            <tr key={item._id + item.examCode}>
                <th scope="row">{item.examName}</th>
                <td>{item.examCode}</td>
                <td>
                    <OverlayTrigger
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Tooltip id={`tooltip-right`}>
                                {item.isClosed ? `Click here to open exam to students.` : `Click here to close exam, preventing students from entering.`}
                            </Tooltip>
                        }>
                        <Button variant="outline-warning" onClick={() => {toggleCloseExam(item._id)}}>{item.isClosed ? <Lock /> : <LockOpen />}</Button>
                    </OverlayTrigger>
                </td>
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
        toggleCloseExam: (examId) => {
            dispatch(toggleCloseExam(examId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);