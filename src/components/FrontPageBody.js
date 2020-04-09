import React from 'react';

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