import { createStore, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromiseMiddleware())));