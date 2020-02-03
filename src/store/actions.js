// Action and Action Creator can be in separate files, but since there
// aren't that many I've included them all here.

// Actions
export const POSTS_FETCH = 'POST_FETCH';
export const POSTS_FETCH_OK = 'POST_FETCH_OK';
export const POSTS_FETCH_ERR = 'POST_FETCH_ERR';
export const POSTS_FETCH_INPROGRESS = 'POST_SEARCH_INPROGRESS';
export const POSTS_CLEAR = 'POSTS_CLEAR';
export const POSTS_SEARCH_FAIL = 'POSTS_SEARCH_FAIL';

// Action Creators
export const fetch = (name, id) => ({
  type: POSTS_FETCH,
  name,
  id
});

export const fetchOk = (name, id, nextId, posts) => ({
  type: POSTS_FETCH_OK,
  name,
  id,
  nextId,
  posts
});

export const fetchFail = () => ({
  type: POSTS_FETCH_ERR
});

export const fetchInprogress = () => ({
  type: POSTS_FETCH_INPROGRESS
});

export const clear = () => ({
  type: POSTS_CLEAR
});

export const searchFailed = () => ({
  type: POSTS_SEARCH_FAIL
});
