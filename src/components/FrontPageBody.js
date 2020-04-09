import React from 'react';

function FrontPageBody() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3> Download Student Application </h3>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary">Download Mac Application</button>
                        <button type="button" className="btn btn-secondary">Download Windows Application</button>
                    </div>
                </div>
                <div className="col">
                    <h3> Sign up for Pilot Program </h3>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrontPageBody;