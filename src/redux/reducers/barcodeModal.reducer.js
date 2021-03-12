import { BarcodeModalActionTypes } from "../actions/barcodeModal.action";

const initialState = {
    open: false
};

export default function barcodeModalReducer(state = initialState, action) {
    switch (action.type) {
        case BarcodeModalActionTypes.OPEN_BARCODE_MODAL:
            return {
                open: true
            }
        case BarcodeModalActionTypes.CLOSE_BARCODE_MODAL:
            return {
                open: false
            }
        default:
            return { ...state };
    }
}