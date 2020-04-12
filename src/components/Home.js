import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import Navbar from './NavBar';
import FrontPageBody from './FrontPageBody';
import { clearError } from '../actions/authAction';

var state = {
    error: ''
}

function Home(props) {
    function resetError() {
        props.clearError();
        state.error = "";
    }

    if (props.auth.error) {
        state.error = props.auth.error;
    }

    function ErrorModal() {
        return (
            <Modal show={state.error ? true : false} onHide={() => resetError()}>
                <Modal.Body>{props.auth.error}</Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={() => resetError()}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <div>
            <Navbar />
            <div className="jumbotron vertical-center">
                <FrontPageBody />
            </div>
            <ErrorModal />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearError: () => {
            dispatch(clearError());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);