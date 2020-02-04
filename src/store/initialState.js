//State of the app, sliced to reddit.

export const initialState = {
  searchFail: false,
  isFetching: false,
  name: '  ',
  id: null,
  nextId: null,
  posts: []
};

/*
    Post
    {
      id: data.id,
      title: data.title,
      author: data.author,
      thumbnail: !data.is_self ? data.thumbnail : null,
      created: formatDate(parseInt(data.created_utc)),
      redditLink: data.permalink,
      srcLink: data.url
    }
  */
