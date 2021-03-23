import Modal from 'react-modal';
import React from 'react';
import modalStyles from '../../../constants/modalStyles';
import UpdateProfileForm from '../../forms/UpdateProfileForm/UpdateProfileForm';

function UpdateProfileModal(props) {
    const { open, onClose } = props;

    Modal.setAppElement("#root");
    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            style={modalStyles}
        >
            <div className='modal update-profile-modal'>
                <UpdateProfileForm/>
            </div>
        </Modal>
    )
}

export default UpdateProfileModal;