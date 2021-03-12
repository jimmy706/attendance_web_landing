import { combineReducers } from 'redux';
import barcodeModalReducer from './barcodeModal.reducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    userState: userReducer,
    barcodeModalState: barcodeModalReducer
})

export default rootReducer;