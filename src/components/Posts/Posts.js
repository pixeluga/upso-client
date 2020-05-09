import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import {
  Loader,
  Post,
} from '..';

import Pagination from 'react-js-pagination';

// Actions
import postsActions from '../../actions/posts';

const mapStateToProps = (state) => ({
  currentUser: state.auth.user, 
  isLoading: state.posts.isLoading,
  posts: state.posts.postsArray,
  totalCount: state.posts.total,
});

const mapDispatchToProps = postsActions;

const LIMIT = 10;

class Posts extends Component {
  state = {
    activePage: 1,
  };
  
  componentDidMount() {  
    this.props.fetchPosts(this.getQueryParams());
  };

  componentWillUnmount() {
    this.props.cleanPosts();
  }

  onPageChange = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.fetchPosts(this.getQueryParams())
    })
  }

  getQueryParams() {
    return Object.assign(
      {
        skip: (this.state.activePage - 1) * LIMIT,
        limit: LIMIT
      },
      this.props.queryParams
    )
  }

  render() {
    const { 
      posts,
      isLoading,
      currentUser,
      totalCount } = this.props;

    const totalItemsCount = totalCount ? totalCount : 0;

    if (posts && !isLoading) {
      const postsMap = posts.map( (post) => (
          <li className = 'list-group-item'
            key = { post._id } >
            <Post { ...post } currentUser = { currentUser } />
          </li>
      ));

      return (
        <>
          <h1>All Questions</h1>

          <ul className = 'list-group'>
            { postsMap }
          </ul>

          <nav className = 'mt-2' aria-label = 'Page navigation'>
            <Pagination
              activePage = { this.state.activePage }
              itemsCountPerPage = { LIMIT }
              totalItemsCount = { totalItemsCount }
              onChange = { this.onPageChange }
              itemClass = 'page-item'
              linkClass = 'page-link'
            />
          </nav>
        </>
    )};

    return <Loader title = 'posts' />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)