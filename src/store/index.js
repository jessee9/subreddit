import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware, logger];  // used for debugging
const middlewares = [sagaMiddleware]; // used for debugging

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;

// Inital State of the App
