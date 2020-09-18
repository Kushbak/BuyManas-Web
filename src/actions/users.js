import { usersApi } from "../api/api"
import { stopSubmit } from 'redux-form'


// ACTION CREATORS

export const setUserDataSuccess = (userData) => ({
    type: 'SET_USER_DATA',
    userData
})


export const toggleIsFetching = (isFetching) => ({
    type: 'SET_IS_FETCHING',
    isFetching
})


export const editProfileSuccess = (profileData) => ({
    type: 'EDIT_PROFILE',
    profileData
})

export const editPasswordSuccess = (password) => ({
    type: 'EDIT_PASSWORD',
    password
})



export const newAvatar = (avatar) => ({
    type: 'NEW_AVATAR',
    avatar
})


export const toggleModalWindowEditProfile = () => ({
    type: 'TOGGLE_MODAL_WINDOW_EDIT_PROFILE'
})
export const toggleModalWindowEditPassword = () => ({
    type: 'TOGGLE_MODAL_WINDOW_EDIT_PASSWORD'
})

// REDUX-THUNKS

export const setUserData = (userId) => (dispatch) => {
    usersApi.getUser(userId)
        .then(response => {
            dispatch(setUserDataSuccess(response.data));
        });
}


export const editProfile = (userId, profileData) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    if (profileData.avatar) {
        usersApi.newAvatar(userId, profileData.avatar)
            .then(r => {
                if (r.data.images[0].url) {
                    usersApi.editProfile(userId, profileData)
                        .then(r => {
                            if (r.status === 200) {
                                dispatch(toggleModalWindowEditProfile())
                                dispatch(editProfileSuccess(r.data));
                                dispatch(toggleIsFetching(false));
                            }
                        })
                } else {
                    dispatch(stopSubmit('editProfile', { _error: 'Произошла непредвиденная ошибка' }))
                }
            })
    } else {
        usersApi.editProfile(userId, profileData)
            .then(r => {
                if (r.status === 200) {
                    dispatch(toggleModalWindowEditProfile())
                    dispatch(editProfileSuccess(r.data));
                    dispatch(toggleIsFetching(false));
                } else {
                    dispatch(stopSubmit('editProfile', { _error: 'Произошла непредвиденная ошибка' }))
                }
            })
    }
}

export const editPassword = (userId, passwordData) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersApi.editPassword(userId, passwordData)
        .then(r => {
            if (r.status === 200) {
                dispatch(toggleModalWindowEditPassword())
                dispatch(editPasswordSuccess(r.data.password));
                dispatch(toggleIsFetching(false));
            } else{
                dispatch(stopSubmit('editPassword', { _error: 'Произошла непредвиденная ошибка' }));
            }
        })
}