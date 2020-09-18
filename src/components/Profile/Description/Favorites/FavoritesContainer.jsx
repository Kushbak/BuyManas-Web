import React from 'react'
import Favorites from './Favorites'
import { connect } from 'react-redux'
import { setFavoritePosts, setCurrentPage } from '../../../../actions/posts'

class FavoritesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true
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

        if (this.isBottom(wrappedElement)) {
            this.props.setCurrentPage(this.props.currentPage + 1);
            this.setState({ hasMore: false })
            document.removeEventListener('scroll', this.trackScrolling); 
        }
    }; 

    componentDidMount(){
        this.props.setCurrentPage(1);
        this.props.setFavoritePosts(this.props.userId);
        document.addEventListener('scroll', this.trackScrolling)
}
    
    render() {
        return (
            <Favorites {...this.props} hasMore={this.state.hasMore}/>
        )
    }
};

const mapStateToProps = (state) => ({
    favoritePosts: state.profilePage.favoritePosts,
    userId: state.auth.id,
    currentPage: state.postsData.currentPage
})


export default connect(mapStateToProps, { setFavoritePosts, setCurrentPage })(FavoritesContainer)