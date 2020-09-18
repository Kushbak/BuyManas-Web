import React from 'react';
import {useSelector} from 'react-redux';
import Navbar from './Navbar/Navbar';
import TopPostsContainer from './TopPosts/TopPostsContainer';
import styles from './Main.module.css'
import LastPostsContainer from './LastPosts/LastPostsContainer';
import SearchedPostsContainer from './SearchedPosts/SearchedPostsContainer';

const Main = (props) => {

    let searchedPost = useSelector(state => state.postsData.searchedPost);    

    return ( 
        <div className={styles.mainWrapper}> 
            <Navbar />
            {searchedPost ?
                <SearchedPostsContainer/>
            :<>
                <TopPostsContainer />
                <LastPostsContainer />
            </>} 
        </div>

    )
}

export default Main;