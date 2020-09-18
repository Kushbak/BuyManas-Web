const initialState = { 
    posters: [], 
    favoritePosts: [], 
    editProfileModalOpen: false,
    editPasswordModalOpen: false,
    isFetching: false,
    isPosting: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state,
                ...action.userData
            };
        }
        case 'TOGGLE_MODAL_WINDOW_EDIT_PROFILE': {
            return {
                ...state,
                editProfileModalOpen: !state.editProfileModalOpen
            }
        } 
        case 'TOGGLE_MODAL_WINDOW_EDIT_PASSWORD': {
            return {
                ...state,
                editPasswordModalOpen: !state.editPasswordModalOpen
            }
        } 
        case 'SET_IS_FETCHING':{
            return { ...state, isFetching: action.isFetching }
        } 
        case 'SET_IS_POSTING':{
            return { ...state, isPosting: action.isPosting }
        }
        case 'SET_FAVORITE_POSTS':{
            return { 
                ...state, 
                favoritePosts: action.favoritePosts
            }
        }
        default:
            return state;
    }

}
export default profileReducer;