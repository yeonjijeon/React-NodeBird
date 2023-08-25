import { HYDRATE } from "next-redux-wrapper"
import user from './user'
import post from './post'
import { combineReducers } from "redux"


const rootReducer = combineReducers({
    index: (state = {}, action) => {
        // 이전 상태와 액션을 통해 다음상태를 만드는 것
        switch(action.type) {
            case HYDRATE:
                console.log('HYDRATE', action)
                return { ...state, ...action.payload}
          
            default:
                return state;    
        }
    },
    user,
    post,
})

export default rootReducer
