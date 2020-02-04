import moment from 'moment';

const formatDate = s => {
  // not locale dependent
  return moment.utc(s * 1000).format('MM/DD/YYYY');
};

// converts reddit json datastructure into array that can be used to populate list
export const parseSubreddit = data => {
  let posts = [];
  let after; // id of next post, used for pagination
  let before; // id of prev post, used for pagination

  if (!!data) {
    const items = data.data && data.data.children;
    if (!!items) {
      posts = items.slice(0, 25).map(post => {
        const data = post.data;
        return {
          id: data.id,
          title: data.title,
          author: data.author,
          thumbnail: !data.is_self ? data.thumbnail : null,
          created: formatDate(parseInt(data.created)),
          redditLink: `https://www.reddit.com${data.permalink}`,
          srcLink: data.is_self ? null : data.url
        };
      });
      before = `t3_${posts[0].id}`;
      after = `t3_${posts[posts.length - 1].id}`;
    }
  }

  return {
    posts: posts,
    after,
    before
  };
};

// deals with duplicate posts, based on id's
export const mergePosts = (current, next) => {
  const ids = new Set(next.map(post => post.id));
  const merged = current.filter(post => !ids.has(post.id)).concat(next);

  return merged;
};
