import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sinon from 'sinon';
import API from './store/API';
import rootSaga from './store/rootSaga';
import rootReducer from './store/rootReducer';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const renderWithRedux = Component => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return [
    {
      ...render(<Provider store={store}>{Component}</Provider>)
    },
    store
  ];
};

const posts = [{ id: '1' }, { id: '2' }, { id: '3' }];

describe('Integation Tests', () => {
  const apiStub = sinon.stub(API, 'getPosts').returns({
    posts: posts,
    after: '2',
    before: '1'
  });

  afterAll(() => {
    apiStub.restore();
  });

  xit('Searching for JUDO should return posts', async () => {
    const [{ findByTestId }, store] = renderWithRedux(<App />);
    const input = await findByTestId('search-field');
    const form = await findByTestId('search-form');

    // store.subscribe(() => {
    //   console.log(store.getState());
    // });

    input.value = 'Judo';
    await fireEvent.submit(form);

    expect(store.getState().posts).toEqual(posts);
  });
  // Todo, test all scenarios of retrieving posts from reddit
  xit('Searching for HHHHHHHHH should return an empty array', () => {});
  xit('List infinite scroll test', () => {});
  xit('List auto referesh test', () => {});
});
