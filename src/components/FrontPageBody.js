import React from 'react';
import {
    Form, 
    Button
} from 'react-bootstrap';

function FrontPageBody() {
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
                    <Form>
                        <Form.Group>
                            <Form.Label>Exam Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Exam Code" />
                            <Form.Text className="text-muted">
                                You would've received this from your Lecturer.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="text" placeholder="Student ID" />
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