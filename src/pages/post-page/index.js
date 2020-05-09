import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

// Components
import { Loader } from '../../components/'

// Actions
import postsActions from '../../actions/posts';

const mapStateToProps = (state) => ({
    posts: state.posts,
});

const mapDispatchToProps = postsActions;

const PostPage = ({ getPostById, match, history, posts }) => {
    
    const bodyRef = useRef(null);

    const setPostBody = (body) => {
        bodyRef.current ? bodyRef.current.innerHTML = body : bodyRef.current = '';
    }

    useEffect(() => {
        getPostById(match.params.id, history);
    }, [getPostById, history, match.params.id]);

    useEffect(() => {
        setPostBody(posts.post.body);
    }, [posts.post]);

    return !posts.isLoading && posts.post !== '' ? (
        <div className = 'row mt-4'>
            <div className = 'col-md-6 mx-auto'>
                <h2>{posts.post.title}</h2>
                <div ref = { bodyRef } ></div>
            </div>
        </div>
):  <Loader />
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
