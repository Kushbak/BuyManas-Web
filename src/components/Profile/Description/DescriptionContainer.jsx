import React from 'react';
import Description from './Description';
import { setUserData, newAvatar, editProfile, editPassword, toggleModalWindowEditProfile, toggleModalWindowEditPassword} from '../../../actions/users';
import { setFaculties, setDepartments } from '../../../actions/faculties';
import { connect } from 'react-redux';


class DescriptionContainer extends React.Component {
    componentDidMount() {
        this.props.setUserData(this.props.id);
        this.props.setDepartments();
        this.props.setFaculties();
    }
    render() {
        return <Description {...this.props} />
    }
}

const mapStateToProps = (state) => {

    return {
        avatar: state.auth.avatar,
        myAvatar: state.auth.images,
        name: state.auth.name,
        id: state.auth.id,
        username: state.auth.username,
        password: state.auth.password,
        email: state.auth.email,
        posters: state.profilePage.posters,
        phone: state.auth.phone,
        faculty: state.auth.faculty,
        editProfileModalOpen: state.profilePage.editProfileModalOpen,
        editPasswordModalOpen: state.profilePage.editPasswordModalOpen,
        isFetching: state.profilePage.isFetching, 
        faculties: state.categoriesBlock.faculties
    }
}
 

export default connect(mapStateToProps,
    {
        setUserData,
        toggleModalWindowEditProfile,
        toggleModalWindowEditPassword,
        newAvatar,
        editProfile,
        editPassword,
        setFaculties,
        setDepartments
    }
)(DescriptionContainer);