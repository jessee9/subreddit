import { runSaga } from 'redux-saga';
import sinon from 'sinon';
import API from './API';
import { fetchPosts } from './rootSaga';
import { POSTS_FETCH, POSTS_FETCH_OK, POSTS_FETCH_INPROGRESS } from './actions';

describe('Test Root Saga', () => {
  const initialState = {
    searchFail: false,
    isFetching: false,
    name: '  ',
    id: null,
    nextId: null,
    posts: []
  };
  const posts = [{ id: '1' }, { id: '2' }];

  it('should dispatch POSTS_FETCH_OK when name and id are provided', async () => {
    const dispacthedActions = [];
    const mockStore = {
      getState: () => initialState,
      dispatch: action => dispacthedActions.push(action)
    };

    const apiStub = sinon.stub(API, 'getPosts').returns({
      posts,
      after: '2',
      before: '1'
    });

    await runSaga(mockStore, fetchPosts, {
      type: POSTS_FETCH,
      name: 'judo',
      id: '1'
    }).done;

    expect(dispacthedActions[0]).toEqual({
      type: POSTS_FETCH_INPROGRESS
    });
    expect(apiStub.called).toBe(true);
    expect(dispacthedActions[1]).toEqual({
      type: POSTS_FETCH_OK,
      name: 'judo',
      id: '1',
      nextId: '2',
      posts
    });

    apiStub.restore();
  });
});
