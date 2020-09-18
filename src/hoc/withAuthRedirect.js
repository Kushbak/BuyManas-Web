import React from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Cookies from 'universal-cookie';

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth
    }
}
let cookies = new Cookies();

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        
        render() {
            if (!this.props.isAuth && !cookies.get('id')) return <Redirect to='/' />
            return <Component {...this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
} 