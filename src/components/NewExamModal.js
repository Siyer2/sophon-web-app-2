import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import {
    toggleExamModal,
    getApplications, 
    createExam
} from '../actions/examAction';

function NewExamModal(props) {
    const [state, setState] = useState({});

    function handleCreateExam(event) {
        event.preventDefault();
        const application = state.application ? state.application : props.exams.applications[0].name;
        const applicationId = (_.find(props.exams.applications, {name: application}))._id;
        props.createExam(state.examName, state.file, applicationId);
    }

    function handleChange(event, name) {
        event.persist();
        if (name === 'questionFile') {
            setState(prevState => {
                return { ...prevState, file: event.target.files[0] };
            });
        }
        else {
            setState(prevState => {
                return { ...prevState, [name]: event.target.value };
            });
        }
    }

    function toggleNewExamModal() {
        !props.exams.applications.length && props.getApplications();
        props.toggleExamModal();
        setState(prevState => {
            return { ...prevState, file: '' };
        });
    }

    const applications = props.exams.applications.map((application) => {
        return (
            <option key={application._id}>{application.name}</option>
        )
    });

    return (
        props.exams.error ?
            <Modal show={props.exams.newExamModalOpen} onHide={() => { toggleNewExamModal() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Failed Creating Exam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.exams.error}
            </Modal.Body>
            </Modal>
        :
        props.exams.creatingExam ?
        <Modal show={props.exams.newExamModalOpen} onHide={() => { toggleNewExamModal() }}>
            <Modal.Header closeButton>
                <Modal.Title>New Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </Modal.Body>
        </Modal>
        :
        props.exams.newExam ? 
        <Modal show={props.exams.newExamModalOpen} onHide={() => { toggleNewExamModal() }}>
            <Modal.Header closeButton>
                <Modal.Title>Created Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Share the code <strong>{props.exams.newExam.examCode}</strong> with your students. <br/><br/>
                Students entering this code in the Sophon desktop application will enter the examination for {props.exams.newExam.examName}.
            </Modal.Body>
        </Modal>
        :
        <Modal show={props.exams.newExamModalOpen} onHide={() => { toggleNewExamModal() }}>
            <Modal.Header closeButton>
                <Modal.Title>New Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {handleCreateExam(e)}}>
                    <Form.Group>
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter exam name" onChange={(e) => { handleChange(e, "examName") }} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Application</Form.Label>
                        <Form.Control required as="select" onChange={(e) => { handleChange(e, "application") }}>
                            {applications}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Question Files</Form.Label>
                        <Form.File
                            id="custom-file"
                            label={state.file ? state.file.name : "No file chosen"}
                            custom
                            onChange={(e) => { handleChange(e, "questionFile") }}
                        />
                        <Form.Text className="text-muted">
                            Every student will have this file when they open the exam.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Exam
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        exams: state.exams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleExamModal: () => {
            dispatch(toggleExamModal())
        },
        getApplications: () => {
            dispatch(getApplications())
        },
        createExam: (examName, file, applicationId) => {
            dispatch(createExam(examName, file, applicationId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExamModal);