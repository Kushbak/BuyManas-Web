import React from 'react'; 
import { connect } from 'react-redux';
import SearchedPosts from './SearchedPosts';
import { setPostByTitle } from '../../../actions/posts';

class SearchedPostsContainer extends React.Component{
    
    render(){
        return <SearchedPosts {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return{
        searchedPost: state.postsData.searchedPost
    }
}; 

export default connect(mapStateToProps, {setPostByTitle})(SearchedPostsContainer);


