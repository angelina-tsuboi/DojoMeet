import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import fire from '../../../config/fire-conf';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ReactDatetime from "react-datetime";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Container,
    Col,
    Label
} from "reactstrap";

import 'date-fns';

class PostModal extends React.Component {
    state = {
        title: this.props.post.title,
        description: this.props.post.description,
        location: this.props.post.location,
        likeMembers: this.props.post.likeMembers,
        joining: this.props.post.joining,
        selectedDate: this.props.post.date,
        selectedTime: this.props.post.time,
        userData: {
            uid: this.props.userData.uid,
            email: this.props.userData.email,
            name: this.props.userData.name,
            photoURL: this.props.userData.photoURL
        },
        onClose: this.props.onClose,
        selectedValue: this.props.selectedValue,
        open: this.props.open
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col md="4" sm="6">
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.props.open}
                            toggle={() => this.handleClose()}
                        >
                            <h1>{this.state.title}</h1>
                            <h4>{this.state.location}</h4>

                            <p>{this.state.description}</p>

                            <h3>Address:</h3>
                            <h3>{this.state.location}</h3>

                            <h3>{this.state.joining.length} joining</h3> 
                            <h3>{this.state.likeMembers.length} likes</h3> 
                        </Modal>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default PostModal;
