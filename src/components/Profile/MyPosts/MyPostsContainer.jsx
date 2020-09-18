import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { setUserData} from '../../../actions/users';
import { setPosts, setCurrentPage } from '../../../actions/posts';
import Cookies from 'universal-cookie';


class MyPostsContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasMore: this.props.posts.length >= 30 ? true : false
        }
    }
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentDidMount() {
        let cookies = new Cookies();  
        document.addEventListener('scroll', this.trackScrolling)
        this.props.setUserData(cookies.get('id'));
        this.props.setCurrentPage(1);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('root');
        if (this.isBottom(wrappedElement)) {
            this.props.setCurrentPage(this.props.currentPage + 1);
            this.props.setPosts(this.props.currentPage);
            this.setState({hasMore: false})
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };

    render() {
        return <MyPosts {...this.props} hasMore={this.state.hasMore}/>
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posters,
        id: state.auth.id,
        currentPage: state.postsData.currentPage
    }
};


export default connect(mapStateToProps, { setUserData, setPosts, setCurrentPage })(MyPostsContainer);


