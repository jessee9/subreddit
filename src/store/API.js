import axios from 'axios';

import { parseSubreddit } from './util';

// Reddit URL hardcoded in package.json, proxy
// const REDDIT_URL = 'https://reddit.com/r';

export const API = {
  getPosts: async (name, next) => {
    const url = `/r/${name}.json`;
    const params = {
      limit: 25
    };

    if (!!next) {
      params.after = next;
    }

    return axios
      .get(url, {
        params
      })
      .then(response => {
        return parseSubreddit(response.data);
      })
      .catch(error => {
        return { posts: [] };
      });
  }
};

export default API;
