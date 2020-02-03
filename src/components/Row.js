// Row Presentation Component used inside of List.
// Layout and CSS could use more polishing.

import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';

const Row = ({ index, data, style }) => {
  const { posts, isItemLoaded } = data;
  const post = posts[index];
  return (
    <div style={style}>
      {!isItemLoaded(index) ? (
        <p>Loading...</p>
      ) : (
        <Media className="border border-primary shadow p-2 m-3 bg-white rounded">
          <Media.Body>
            <h5 className="mt-0 mb-1 font-weight-bold">{post.title}</h5>
            <ul>
              <li>By: {post.author}</li>
              <li>On: {post.created}</li>
              <li>
                <a href={post.redditLink}>Reddit Link</a>
              </li>
              {post.srcLink ? (
                <li>
                  <a href={post.srcLink}>Posting Link</a>
                </li>
              ) : null}
            </ul>
          </Media.Body>
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.thumbnail}
              height="90%"
              className="align-self-center ml-3"
            />
          ) : null}
        </Media>
      )}
    </div>
  );
};

Row.prototype = {
  index: PropTypes.number,
  data: PropTypes.object,
  style: PropTypes.object
};

export default Row;
