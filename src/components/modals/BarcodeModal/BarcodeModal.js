import JsBarcode from 'jsbarcode';
import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlaceholder from 'react-placeholder/lib';
import { useSelector, useDispatch } from 'react-redux';
import modalStyles from '../../../constants/modalStyles';
import { closeBarcodeModalAction } from '../../../redux/actions/barcodeModal.action';
import CommonButton from '../../buttons/CommonButton/CommonButton';


function BarcodeModal() {
    const barcodeModalState = useSelector(state => state.barcodeModalState);
    const userState = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    function handleOpen() {
        setTimeout(() => {
            if (userState.profile !== null) {
                JsBarcode('#barcode-display', userState.profile.account.username);
                setLoading(false);
            }
        }, 1000);
    }

    Modal.setAppElement("#root");

    return (
        <Modal
            onAfterOpen={handleOpen}
            isOpen={barcodeModalState.open}
            onRequestClose={() => dispatch(closeBarcodeModalAction())}
            style={modalStyles}
        >
            <div className='modal barcode-modal'>
                <h3 className='barcode-modal__title'>Scan this barcode to attend meeting</h3>
                <div className='barcode-modal__barcode-container'>
                    <svg style={{ display: loading ? 'none' : 'block' }} id='barcode-display'></svg>
                    {
                        loading ? (<ReactPlaceholder type='rect' style={{ width: '300px', height: '100px' }} />) : null
                    }
                </div>

                <CommonButton width='100%' onClick={() => dispatch(closeBarcodeModalAction())}>DONE</CommonButton>
            </div>
        </Modal>
    )
}

export default BarcodeModal;