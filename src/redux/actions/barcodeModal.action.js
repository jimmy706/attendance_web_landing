export const BarcodeModalActionTypes = {
    OPEN_BARCODE_MODAL: 'OPEN_BARCODE_MODAL',
    CLOSE_BARCODE_MODAL: 'CLOSE_BARCODE_MODAL'
}

export function openBarcodeModalAction() {
    return {
        type: BarcodeModalActionTypes.OPEN_BARCODE_MODAL
    }
}

export function closeBarcodeModalAction() {
    return {
        type: BarcodeModalActionTypes.CLOSE_BARCODE_MODAL
    }
}

