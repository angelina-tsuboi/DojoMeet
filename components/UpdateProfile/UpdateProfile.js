
import React from 'react';
import fire from '../../config/fire-conf';
import { useFirestore } from '../../firebase/useFirestore';
import ReactDatetime from "react-datetime";
const firestore = useFirestore();

import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col,
    Label
} from "reactstrap";

import 'date-fns';

class UpdateProfile extends React.Component {

    state = {
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

            <Modal
                className="modal-dialog-centered"
                isOpen={this.props.open}
                toggle={() => this.handleClose()}
            >
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                        Edit Event
      </h6>
                </div>
            </Modal>

        );
    }
}

export default UpdateProfile;
