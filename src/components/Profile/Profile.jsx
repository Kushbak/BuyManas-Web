import React from 'react';  
import DescriptionContainer from './Description/DescriptionContainer';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

const Profile = (props) => {
    return(
        <div>
            <div className="wrapper">
                <DescriptionContainer />
                <MyPostsContainer />
            </div>
        </div>
    )
};

export default compose(withAuthRedirect)(Profile);