import FavoritesContainer from './components/Profile/Description/Favorites/FavoritesContainer';
import FacultiesPostsContainer from './components/FacultiesPosts/FacultiesPostsContainer';
import NewPostContainer from './components/Profile/Description/NewPost/NewPostContainer';
import { clearFacultyPosts, setFaculties, setDepartments } from './actions/faculties';
import PostsPageContainer from './components/Main/PostsPage/PostsPageContainer';
import HeaderContainer from './components/Header/HeaderContainer'
import Preloader from './components/common/Preloader/Preloader';
import { setPosts, setAllPosts } from './actions/posts'
import { Route, withRouter } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
import { initializeApp } from './actions/login'
import Main from './components/Main/Main';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import './App.css';

let cookies = new Cookies();

class App extends React.Component {

    componentDidMount() {
        if(cookies.get('id')){
            this.props.initializeApp();
        }
        this.props.setPosts();
        this.props.setFaculties();
        this.props.setDepartments();        
        this.props.setAllPosts();
    }

    render() {
        if (cookies.get('id') && !this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="appWrapper">
                <HeaderContainer />
                <Route exact path='/' render={() => <Main />} />
                <Route path='/profile' render={() => <Profile />} />
                <Route path='/facultiesPosts/:facultyId' render={() => <FacultiesPostsContainer />} />
                <Route path={'/facultiesPosts/:facultyId/posts/:postsId'} render={() => <PostsPageContainer />} />
                <Route path={'/posts/:postsId'} render={() => <PostsPageContainer />} />
                <Route path={'/newPost'} render={() => <NewPostContainer />} />
                <Route path={'/favoritePosts'} render={() => <FavoritesContainer />} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    allPosts: state.postsData.posts,
    myPosts: state.profilePage.posters
})

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp, setPosts, clearFacultyPosts, setFaculties, setDepartments, setAllPosts })
)(App);
