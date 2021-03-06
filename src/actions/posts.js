import { postersApi } from "../api/api"
import { stopSubmit } from 'redux-form'


// ACTION CREATORS

export const setPostsByTitleSuccess = searchedPost => ({
    type: 'SET_POSTS_BY_TITLE',
    searchedPost
})

export const setPostsByTitleFailure = () => ({
    type: 'NOTHING_FOUNDED',
    searchedPost: undefined
})

export const setPostsSuccess = posts => ({
    type: 'SET_POSTS',
    posts
})

export const setAllPostsSuccess = allPosts => ({
    type: 'SET_ALL_POSTS',
    allPosts
})

export const setOnePost = (postData) => ({
    type: 'SET_ONE_POST',
    postData
})

export const setLike = (ratingData) => ({
    type: 'SET_LIKE',
    ratings: ratingData,
})

// export const newPostSuccess = (newPostData) => ({
//     type: 'NEW_POST',
//     newPostData
// })

export const newCurrentImage = (image) => ({
    type: 'NEW_CURRENT_IMAGE',
    image
})

export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage: page
})

export const setFavoritePostsSuccess = (favoritePosts) => ({
    type: 'SET_FAVORITE_POSTS',
    favoritePosts
})

export const toggleIsPosting = (isPosting) => ({
    type: 'SET_IS_POSTING',
    isPosting
})

export const toggleIsGettingPost = (isGettingPosts) => ({
    type: 'SET_IS_GETTING_POST',
    isGettingPosts
})

// REDUX-THUNKS

export const setPostByTitle = (title) => (dispatch) => {
    try {
        if (title) {
            postersApi.getPostsByTitle(title)
                .then(response => {
                    if (response.data.length > 0) {
                        dispatch(setPostsByTitleSuccess(response.data))
                    }
                })
        }
        else {
            dispatch(setPostsByTitleFailure())
        }
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    }
}

export const setPosts = (page) => (dispatch) => {
    try {
        postersApi.getPosts(page)
            .then(response => {
                dispatch(setPostsSuccess(response.data));
            });
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}

export const setAllPosts = () => (dispatch) => {
    try {
        dispatch(toggleIsGettingPost(true))
        let posts = []
        async function proccessGettingPosts(array) {
            for (let item of array) {
                await postersApi.getPosts(item)
                    .then(response => {
                        posts.push(...response.data)
                    });
                if (posts.length > 30) {
                    dispatch(setAllPostsSuccess(posts));
                }
            }
            dispatch(toggleIsGettingPost(false))
        }
        proccessGettingPosts([1, 2, 3, 4, 5]);
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}

export const getOnePost = (postId) => (dispatch) => {
    try {
        postersApi.getOnePost(postId)
            .then(r => {
                dispatch(setOnePost(r.data))
            })
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}

export const getRating = (postId) => (dispatch) => {
    try {
        postersApi.getRating(postId)
            .then(r => {
                dispatch(setLike(r.data))
            })
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}

export const likeThePost = (userReq, postId, obj) => (dispatch) => {
    try {
        postersApi.likeThePost(userReq, postId, obj)
            .then(r2 => {
                postersApi.getRating(postId)
                    .then(r3 => {
                        dispatch(setLike(r3.data))
                    })
            })
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}

export const newPostImage = (newPostData) => (dispatch) => {
    try {
        if (newPostData.images) {
            dispatch(toggleIsPosting(true))
            postersApi.newPostImage(newPostData.images)
                .then(r => {
                    if (r.data.url) {
                        postersApi.newPost(newPostData, r)
                            .then(r => {
                                dispatch(toggleIsPosting(false))
                                dispatch(setPosts());
                                if (r.status === 201) {
                                    dispatch(stopSubmit('newPost', { _error: 'Объявление опубликовано' }));
                                    dispatch(newCurrentImage(null));
                                }
                            })
                    }
                })
        } else {
            dispatch(toggleIsPosting(true))
            postersApi.newPost(newPostData)
                .then(r => {
                    dispatch(toggleIsPosting(false))
                    dispatch(newCurrentImage(null));
                    dispatch(stopSubmit('newPost', { _error: 'Объявление опубликовано' }));
                    dispatch(setPosts());
                })
        }
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}

export const setFavoritePosts = (userId, page) => (dispatch) => {
    try {
        postersApi.getFavoritePosts(userId, page)
            .then(r => {
                dispatch(setFavoritePostsSuccess(r.data))
            })
    } catch (e) {
        console.log('Произошла ошибка ' + e);
    } 
}
