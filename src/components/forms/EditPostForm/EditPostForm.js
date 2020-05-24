import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Components
import Loader from '../../layout/Loader'

import postsActions from '../../../actions/posts'

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = postsActions;

class EditPostForm extends Component {
  state = {
    title: '',
    body: '',
  }

  componentDidMount () {
    if (this.props.match.params.id) {
      this.props.getPostById(this.props.match.params.id, this.props.history);
    };
  }

  componentDidUpdate (prevProps) {
    const prevPost = prevProps.posts.post;
    const post = this.props.posts.post;

    if (post && post._id && prevPost.title !== post.title ) {
      this.setState({
        title: post.title,
        body: post.body
      })
    }
  }

  componentWillUnmount() {
    this.props.clearPost();
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  onChangeBody = (e) => {
    this.setState({ body: e })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { editPost, createPost, updatePost } = this.props;
    const prevPost = this.props.posts.post;
    const { title, body } = this.state;

    if (prevPost && prevPost._id) {
      editPost({ ...prevPost,  title, body });
      updatePost({ ...prevPost,  title, body });
    } else {
      createPost({ title, body }); 
      this.setState({ title: '', body: '' });
    }
  }

  render() {
    const { post, isPostLoading } = this.props.posts;

    if (!isPostLoading) {
      return (
        <div className='card mb-4'>
        <div className = 'card-body'>
          <form onSubmit = { this.onSubmit }>
          <div className = 'form-group'>
            <label htmlFor = 'postTitle'>Title:</label>
            <input
              id = 'postTitle'
              className = 'form-control'
              type = 'text'      
              value = { this.state.title }
              placeholder = 'Your title'
              onChange = { this.onChangeTitle } 
            />
          </div>

          <div className = 'form-group'>
            <label htmlFor = 'postBody'>Body:</label>
            
            <ReactQuill
              id = 'postBody'
              placeholder = 'Your text'
              modules = {{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike', 'code'],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
              value = { this.state.body }
              onChange = { this.onChangeBody }
            />
          </div>

          <div className='btn-group float-right'>
            <button type='submit' className='btn btn-dark'>{ post._id ? 'Change Post' : 'Add Post' }</button>
          </div>
          </form>
        </div>
        </div>
      )
    }

    return <Loader title = 'post' />
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm)