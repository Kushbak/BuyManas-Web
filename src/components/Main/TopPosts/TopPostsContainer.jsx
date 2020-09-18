import React from 'react'; 
import { connect } from 'react-redux';
import TopPosts from './TopPosts';
import { setPosts } from './../../../actions/posts';

class TopPostsContainer extends React.Component{  
    render(){
        return <TopPosts {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return{
        posts: state.postsData.posts,
        allPosts: state.postsData.allPosts,
        isFetching: state.profilePage.isFetching,
        isGettingPosts: state.profilePage.isGettingPosts
    }
}; 


export default connect(mapStateToProps, {setPosts})(TopPostsContainer);


