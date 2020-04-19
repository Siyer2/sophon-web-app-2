import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Navbar from './NavBar';
import FrontPageBody from './FrontPageBody';
import { clearError } from '../actions/authAction';

function Home(props) {
    function ErrorModal() {
        return (
            <Modal show={props.auth.error ? true : false} onHide={() => props.clearError()}>
                <Modal.Body>{props.auth.error.toString()}</Modal.Body>
                <Button onClick={() => props.clearError()}>Close</Button>
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