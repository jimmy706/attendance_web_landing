import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const store = createStore(rootReducer, process.env.NODE_ENV === 'production' ? applyMiddleware(...middlewares) : composeWithDevTools(applyMiddleware(...middlewares)));

export default store;