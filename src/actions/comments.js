import { postersApi } from "../api/api"

// ACTION CREATORS

export const newCommentSuccess = (commentData) => ({
    type: 'NEW_COMMENT',
    commentData
}) 


// REDUX-THUNKS

export const newComment = (commentData) => (dispatch) => {
    try{
        postersApi.newComment(commentData)
        .then(r => {
            dispatch(newCommentSuccess(r.data))
        })
    } catch(e){
        console.log('Произошла ошибка ' + e);
    }
}