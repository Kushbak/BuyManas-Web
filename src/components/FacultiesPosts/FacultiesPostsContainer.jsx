import React from 'react';
import FacultiesPosts from './FacultiesPosts';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getFacultiesPosts, clearFacultyPosts } from '../../actions/faculties';
import { setCurrentPage } from '../../actions/posts';




class FacultiesPostsContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasMore: this.props.posts.length >= 30 ? true : false
        }
    }
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    } 

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('root');
        const facultyId = this.props.match.params.facultyId;

        if (this.isBottom(wrappedElement)) {
            this.props.setCurrentPage(this.props.currentPage + 1);
            this.props.getFacultiesPosts(facultyId, this.props.currentPage);
            this.setState({ hasMore: false })
            document.removeEventListener('scroll', this.trackScrolling); 
        }
    }; 

    componentDidMount(){ 
        this.props.setCurrentPage(1);
        this.props.clearFacultyPosts();
        const facultyId = this.props.match.params.facultyId;
        this.props.getFacultiesPosts(facultyId)
        document.addEventListener('scroll', this.trackScrolling)
        
        
    }

    render(){
        return <FacultiesPosts {...this.props} hasMore={this.state.hasMore}/>
    }
}

const mapStateToProps = (state) => {
    return{
        posts: state.postsData.postsOfFaculty,
        currentPage: state.postsData.currentPage
    }        
}

export default compose(
    connect(mapStateToProps, { getFacultiesPosts, setCurrentPage, clearFacultyPosts }),
    withRouter
)(FacultiesPostsContainer);  