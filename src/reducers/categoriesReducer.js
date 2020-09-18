const initialState = {
    faculties: [],
    departments: []
};

const categoriesReducer = (state = initialState, action) => {
    switch(action.type){ 
        case 'SET_FACULTIES':{
            return {
                ...state, 
                faculties: action.faculties 
            };
        } 
        case 'SET_DEPARTMENTS':{
            return {
                ...state, 
                departments: action.departments 
            };
        } 
        default:
            return state;
    } 

} 

export default categoriesReducer;