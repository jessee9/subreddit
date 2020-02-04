// Sagas can be split into different files, but
// for the sake of simplicity and time I put them in one file.

import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
  fetchInprogress,
  fetchOk,
  fetchFail,
  clear,
  POSTS_FETCH,
  searchFailed
} from './actions';
import API from './API';

// Reddit URL hardcoded in package.json, proxy
// const REDDIT_URL = 'https://reddit.com/r';

export function* fetchPosts({ name, id }) {
  yield put(fetchInprogress());
  const { posts, before, after } = yield call(API.getPosts, name, id);

  if (!!posts && posts.length > 0) {
    let currentId = id;
    //new search
    if (!id) {
      currentId = before;
      yield put(clear());
    }
    yield put(fetchOk(name, currentId, after, posts));
  } else {
    // couldn't find any posts with that name
    if (!id) {
      yield put(searchFailed());
    }
    yield put(fetchFail());
  }
}

export default function* rootSaga() {
  yield all([takeLatest(POSTS_FETCH, fetchPosts)]);
}
