let initialState = { 
    isModalOpen: false,
    wannaLogin: true 
};
const authReducer = (state = initialState, action) => {

    switch(action.type){ 
        case 'SET_AUTH_USER_DATA':{
            return {
                ...state,
                ...action.payload
            } 
        }
        case 'USERNAME_PASS':{
            return {
                ...state,
                ...action.payload
            } 
        }
        case 'TOGGLE_WINDOW_MODAL_AUTH':{
            return{
                ...state,
                isModalOpen: !state.isModalOpen
            }
        }
        case 'TOGGLE_MODAL_LOGIN_AUTH':{
            return{
                ...state,
                wannaLogin: !state.wannaLogin
            }
        }
        case 'EDIT_PROFILE':{
            return{
                ...state,
                ...action.profileData
            }
        }
        case 'EDIT_PASSWORD':{
            return{
                ...state,
                password: action.password
            }
        }
        case 'NEW_AVATAR':{
            return{
                ...state,
                avatar: action.avatar
            }
        }
        default:
            return state;
    } 

}; 

export default authReducer;