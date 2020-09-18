import React from 'react';
import { connect } from 'react-redux';
import NewPost from './NewPost';
import { newCurrentImage, newPostImage, setPosts } from '../../../../actions/posts'; 
import {  setDepartments, setFaculties} from '../../../../actions/faculties';

class NewPostContainer extends React.Component { 

    render() {
        return <NewPost {...this.props} />
    }
}

const mapStateToProps = (state) => ({ 
    userId: state.auth.id,
    image: state.postsData.currentImage,
    departments: state.categoriesBlock.departments,
    faculties: state.categoriesBlock.faculties,
    isFetching: state.profilePage.isFetching,
    isPosting: state.profilePage.isPosting
});

export default connect(mapStateToProps, {newPostImage, newCurrentImage, setPosts, setDepartments, setFaculties})(NewPostContainer);