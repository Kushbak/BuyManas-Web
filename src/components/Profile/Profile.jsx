import React from 'react';
import styles from './Profile.module.css';
import DescriptionContainer from './Description/DescriptionContainer';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const Profile = (props) => {
    return(
        <div className={styles.profileWrapper}>
            <DescriptionContainer />
            <MyPostsContainer />
        </div>
    )
};

export default compose(withAuthRedirect)(Profile);