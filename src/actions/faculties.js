import { postersApi, facultiesApi, departmentsApi } from "../api/api"


// ACTION CREATORS

export const setFacultiesSuccess = faculties => ({
    type: 'SET_FACULTIES',
    faculties
})

export const setDepartmentsSuccess = departments => ({
    type: 'SET_DEPARTMENTS',
    departments
})

export const getFacultiesPostsSuccess = (posts) => ({
    type: 'GET_FACULTIES_POSTS',
    posts
})

export const clearFacultyPosts = () => ({
    type: 'CLEAR_FACULTY_POSTS' 
})




// REDUX-THUNKS

export const setFaculties = () => (dispatch) => {
    facultiesApi.getfaculties()
        .then(response => {
            dispatch(setFacultiesSuccess(response.data));
        });
}

export const setDepartments = () => (dispatch) => {
    departmentsApi.getDepartments()
        .then(response => {
            dispatch(setDepartmentsSuccess(response.data));
        });
}

export const getFacultiesPosts = (facultyId, page) => (dispatch) => { 
    if (facultyId === "0") {
        postersApi.getFacultiesNullPosts(page)
            .then(r => {
                dispatch(getFacultiesPostsSuccess(r.data))
    })
    } else {
        postersApi.getFacultiesPosts(facultyId, page)
            .then(r => {
                dispatch(getFacultiesPostsSuccess(r.data))
    })
    }
}