import React from 'react';
import {
    Form, 
    Button
} from 'react-bootstrap';

var state = {};

function FrontPageBody(props) {
    function enterExamClicked(event) {
        event.preventDefault();
        console.log("state", state);
    }
    function handleChangeText(event, name) {
        state[name] = event.target.value;
    }
    return (
        <div className="container px-lg-5">
            <div className="row mx-lg-n5">
                <div className="col py-3 px-lg-5 border bg-light">
                    <h3> Download Student Application </h3>
                    <button type="button" className="btn btn-secondary">Download Mac Application</button>
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
                        <Button variant="primary" type="submit">
                            Enter
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default FrontPageBody;