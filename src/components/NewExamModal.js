import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import {
    toggleExamModal,
    getApplications
} from '../actions/examAction';

function NewExamModal(props) {
    const [state, setState] = useState({});
    function handleChange(event, name) {
        event.persist();
        if (name === 'questionFile') {
            setState(prevState => {
                return { ...prevState, file: event.target.files[0] };
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
        <Modal show={props.exams.newExamModalOpen} onHide={() => { toggleNewExamModal() }}>
            <Modal.Header closeButton>
                <Modal.Title>New Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Exam Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter exam name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Application</Form.Label>
                        <Form.Control as="select">
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
                        Submit
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExamModal);