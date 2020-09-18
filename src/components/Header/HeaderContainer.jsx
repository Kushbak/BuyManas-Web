import React from 'react';
import Header from './Header';
import { setAuthUserData, toggleModalWindowAuth, toggleModalLoginAuth, login, logout, register } from '../../actions/login'
import { connect } from 'react-redux';

class HeaderContainer extends React.Component {  
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isModalOpen: state.auth.isModalOpen,
    wannaLogin: state.auth.wannaLogin,
    isAuth: state.auth.isAuth,
    faculties: state.categoriesBlock.faculties,
    username: state.auth.username,
    password: state.auth.password,
    isFetching: state.profilePage.isFetching
}); 

export default connect(mapStateToProps, {setAuthUserData, toggleModalWindowAuth, toggleModalLoginAuth, login, logout, register})(HeaderContainer);