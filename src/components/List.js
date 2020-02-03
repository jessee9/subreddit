// React-Window List offers infinite scrolling and virtual scrolling (only render elements
// that are in the viewport).

import React from 'react';
import PropTypes from 'prop-types';

import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import Row from './Row';

const getItemKey = (index, data) => (!!data[index] ? data[index].id : index);

const List = ({ posts, loadNextPage, hasNext, isLoading }) => {
  const getItemSize = index => {
    let size = 0;
    if (!!posts[index]) {
      size = posts[index].thumbnail ? 180 : 150;
    }
    return size;
  };
  const isItemLoaded = index => !hasNext || index < posts.length;
  const itemCount = hasNext ? posts.length + 1 : posts.length;
  const loadMoreItems = isLoading ? () => {} : loadNextPage;

  return (
    <div className="mx-3">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <VariableSizeList
            itemData={{ posts, isItemLoaded }}
            itemKey={getItemKey}
            itemCount={itemCount}
            itemSize={getItemSize}
            height={800}
            width="100%"
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </VariableSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
};

List.prototype = {
  posts: PropTypes.array,
  loadNext: PropTypes.func.isRequired,
  hasNext: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default List;
