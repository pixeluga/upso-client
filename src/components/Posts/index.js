import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Loader from '../Loader/index';

// Actions
import postsActions from '../../actions/posts';

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = postsActions;

class Posts extends Component {
  componentDidMount() {  
    this.props.fetchPosts();
  };

  render() {
    const { posts } = this.props;

    if (posts) {
      const postsMap = posts.map( (post) => {
        return (
          <li key = { post._id }>{ post.body } [{ post.user.name }]</li>
        )
      });

      return (
        <ul>
          { postsMap }
        </ul>
      )
    }
    return (
          <Loader title = 'posts' />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)