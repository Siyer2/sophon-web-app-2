import React, {useState} from 'react';
import { connect } from 'react-redux';
import { getStudentList } from '../actions/studentAction';
import { toggleCloseExam, deleteExam } from '../actions/examAction';
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
    Tooltip, 
    Modal
} from 'react-bootstrap';

function ExamList(props) {
    const [state, setState] = useState({
        openDeleteExamModal: false
    });

    function examClicked(examId) {
        props.getStudentList(examId);
        history.push(`exams/${examId}`);
    }

    function toggleCloseExam(examId) {
        props.toggleCloseExam(examId);
    }

    function deleteExamClicked(examId, examName) {
        setState(prevState => {
            return { ...prevState, examToDelete: examName, examId };
        });

        toggleExamModal();
    }

    function toggleExamModal() {
        setState(prevState => {
            return { ...prevState, openDeleteExamModal: !state.openDeleteExamModal };
        });
    }

    function deleteExam() {
        props.deleteExam(state.examId);

        setState(prevState => {
            return { ...prevState, openDeleteExamModal: !state.openDeleteExamModal, examToDelete: '', examId: '' };
        });
    }

    function DeleteExamModal() {
        return (
            <Modal show={state.openDeleteExamModal} onHide={() => {toggleExamModal()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {state.examToDelete}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>All student submissions and files will also be deleted. Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { toggleExamModal() }}>Cancel</Button>
                    <Button variant="danger" onClick={() => {deleteExam()}}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
        )
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
                    <Button variant="outline-danger" onClick={() => {deleteExamClicked(item._id, item.examName)}}>
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
            <DeleteExamModal />
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
        },
        deleteExam: (examId) => {
            dispatch(deleteExam(examId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);