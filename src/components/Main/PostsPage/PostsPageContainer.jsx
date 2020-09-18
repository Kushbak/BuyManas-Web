import React from 'react';
import PostsPage from './PostsPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { getOnePost, likeThePost, getRating } from '../../../actions/posts';
import { newComment } from '../../../actions/comments';
import { toggleModalWindowAuth } from '../../../actions/login';

class PostsPageContainer extends React.Component{
    componentDidMount(){ 
        const postId = this.props.match.params.postsId
        this.props.getOnePost(postId)
        this.props.getRating(postId)
    }
    render(){
        return <PostsPage {...this.props} postId={this.props.match.params.postsId}/>
    }
}

const mapStateToProps = (state) => ({
    post: state.postsData.forPostPage,
    comments: state.postsData.comments,
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
    ratings: state.postsData.ratings[0]
})

export default compose( 
    connect(mapStateToProps, { getOnePost, newComment, likeThePost, toggleModalWindowAuth, getRating }), 
    withRouter
)(PostsPageContainer)
