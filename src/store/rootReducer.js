// Each reducer can be in it's own file and then combined,
// for the sake of simplicity and time I've inlcude all of them here.
import { combineReducers } from 'redux';
import { initialState } from './initialState';

import {
  POSTS_FETCH_INPROGRESS,
  POSTS_FETCH_OK,
  POSTS_FETCH_ERR,
  POSTS_CLEAR,
  POSTS_SEARCH_FAIL
} from './actions';

import { mergePosts } from './util';

const redditReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_FETCH_INPROGRESS:
      return {
        ...state,
        isFetching: true
      };
    case POSTS_FETCH_OK:
      return {
        ...state,
        isFetching: false,
        posts: mergePosts(state.posts, action.posts), // removing dups
        name: action.name,
        id: action.id,
        nextId: action.nextId
      };
    case POSTS_FETCH_ERR:
      return {
        ...state,
        isFetching: false
      };
    case POSTS_SEARCH_FAIL:
      return {
        ...state,
        searchFail: true
      };
    case POSTS_CLEAR:
      return {
        ...state,
        searchFail: false,
        name: '',
        id: null,
        nextId: null,
        posts: []
      };
    default:
      return state;
  }
};

const rootReducter = combineReducers({
  reddit: redditReducer
});

export default rootReducter;
