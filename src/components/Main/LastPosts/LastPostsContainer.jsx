import React from 'react';
import { connect } from 'react-redux';
import LastPosts from './LastPosts';
import { setPosts, setPostByTitle, setCurrentPage } from '../../../actions/posts';

class LastPostsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true
        }
    }
    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling)
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
            this.setState({ hasMore: false })
            document.removeEventListener('scroll', this.trackScrolling);
        }
    };
    render() {
        return <LastPosts {...this.props} hasMore={this.state.hasMore} />
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postsData.posts,
        searchedPosts: state.postsData.searchedPosts,
        currentPage: state.postsData.currentPage
    }
};

export default connect(mapStateToProps, { setPosts, setPostByTitle, setCurrentPage })(LastPostsContainer);


