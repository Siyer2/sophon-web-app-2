import React from 'react';
import { connect } from 'react-redux';
import {
    Form, 
    Button
} from 'react-bootstrap';

import { enterExam } from '../actions/examAction';
import fileDownload from 'js-file-download';

var state = {};

function FrontPageBody(props) {
    function enterExamClicked(event) {
        event.preventDefault();
        props.enterExam(state.examCode, state.studentId);
    }
    function handleChangeText(event, name) {
        state[name] = event.target.value;
    }

    return (
        <div className="container px-lg-5">
            <div className="row mx-lg-n5">
                <div className="col py-3 px-lg-5 border bg-light">
                    <h3> Download Student Application </h3>
                    <button type="button" className="btn btn-secondary" onClick={() => { window.location.href = 'https://s3-ap-southeast-2.amazonaws.com/applications.optricom.com/SafeExamBrowser-2.1.5.dmg'}}>Download Mac Application</button>
                    <button type="button" className="btn btn-secondary">Download Windows Application</button>
                </div>
                <div className="col py-3 px-lg-5 border bg-light">
                    <h3> Enter Exam </h3>
                    <Form onSubmit={(e) => { enterExamClicked(e) }}>
                        <Form.Group>
                            <Form.Label>Exam Code</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Exam Code" onChange={(e) => {handleChangeText(e, "examCode")}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Student ID" onChange={(e) => { handleChangeText(e, "studentId") }}/>
                        </Form.Group>
                        <Button disabled={props.exams.enteringExam} variant="primary" type="submit">
                            {props.exams.enteringExam ? "Loading..." : "Enter"}
                        </Button>
                        {props.exams.enteringExam ?
                        <Form.Text className="text-muted">
                            This can take up to 3 minutes.
                        </Form.Text>
                        :
                        props.exams.enterExamError ?
                        <Form.Text className="text-muted">
                            {props.exams.enterExamError.toString()}
                        </Form.Text>
                        : null
                    }
                    </Form>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        exams: state.exams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        enterExam: (examCode, studentId) => {
            dispatch(enterExam(examCode, studentId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageBody);