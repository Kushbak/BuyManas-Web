import { postersApi } from "../api/api"

// ACTION CREATORS

export const newCommentSuccess = (commentData) => ({
    type: 'NEW_COMMENT',
    commentData
})

export const getCommentsSuccess = (comments) => ({
    type: 'GET_COMMENTS',
    comments
})


// REDUX-THUNKS

export const newComment = (commentData) => (dispatch) => {
    postersApi.newComment(commentData)
        .then(r => {
            dispatch(newCommentSuccess(r.data))
        })
}