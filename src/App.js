// This app is not responsive, has not been tested in different browsers aside from chrome
// and is not accessible.

import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import Search from './components/Search';

import { fetch } from './store/actions';
import List from './components/List';

const REFRESH_INTERVAL = 60000; // 1 minute, tested with 10 seconds, still good

const App = ({ name, posts, fetching, fetch, id, nextId, searchFail }) => {
  useEffect(() => {
    let timerId = setTimeout(function refresh() {
      if (!fetching && !!name && !!id) {
        fetch(name, id);
        clearTimeout(timerId);
        timerId = setTimeout(refresh, REFRESH_INTERVAL);
      }
    }, REFRESH_INTERVAL);

    return () => clearTimeout(timerId);
  }, [fetch, fetching, id, name]);

  return (
    <Container fluid>
      <Navbar
        sticky="top"
        bg="primary"
        variant="dark"
        className="justify-content-between"
      >
        <Navbar.Brand href="https://www.reddit.com">
          <img
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Reddit Logo"
          />{' '}
          Reddit Viewer
        </Navbar.Brand>
        <Search isInvalid={searchFail} search={name => fetch(name, null)} />
      </Navbar>
      <div style={{ height: '100%' }}>
        <List
          posts={posts}
          loadNextPage={() => {
            fetch(name, nextId);
          }}
          hasNext={!!nextId}
          isLoading={fetching}
        />
      </div>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    name: state.reddit.name,
    posts: state.reddit.posts,
    id: state.reddit.id,
    nextId: state.reddit.nextId,
    fetching: state.reddit.isFetching,
    searchFail: state.reddit.searchFail
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
