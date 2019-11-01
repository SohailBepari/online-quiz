const initState = {
    user : undefined
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'LOGOUT'){
        return {
            ...state, 
            user : undefined
        }
    }
    if(action.type === 'LOGIN'){
        return {
            ...state,
            user : action.user
        }
    }
    return state;
}

export default rootReducer;