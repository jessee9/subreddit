import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import App from './App';
import API from './store/API';
import rootSaga from './store/rootSaga';
import rootReducer from './store/rootReducer';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore(rootReducer, {}, [sagaMiddleware]);
const store = mockStore({});

sagaMiddleware.run(rootSaga);

describe.skip('Integation Tests', () => {
  const apiStub = sinon.stub(API, 'getPosts').returns({
    posts: [{ id: '1' }, { id: '2' }, { id: '3' }],
    after: '2',
    before: '1'
  });

  let AppComponent = render.create(
    <Provider store={mockStore}>
      <App />
    </Provider>
  );

  it('Searching for JUDO should return posts', () => {});

  apiStub.restore();
});
