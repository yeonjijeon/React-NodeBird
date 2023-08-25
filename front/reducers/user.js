export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,

    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,

    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,

    changeNickLoading: false, // 닉네임 변경 시도중
    changeNickDone: false,
    changeNickError: null,

    me: null,
    signUpData: {},
    loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICK_REQUEST = 'CHANGE_NICK_REQUEST'
export const CHANGE_NICK_SUCCESS = 'CHANGE_NICK_SUCCESS'
export const CHANGE_NICK_FAILURE = 'CHANGE_NICK_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data
    }
}

export const logoutRequestAction = () => {
    return { 
        type: LOG_OUT_REQUEST,
    }
}

export const logoutSuccessAction = () => {
    return { 
        type: LOG_OUT_SUCCESS,
    }
}


export const logoutFailureAction = () => {
    return { 
        type: LOG_OUT_FAILURE,
    }
}

const dummyUser = (data) => ({
    ...data, 
    nickname: 'yj',
    id: 1,
    Posts: [{id : 1}],
    Followings: [{ nickname: 'a'}, {nickname: 'b'}, {nickname: 'c'}],
    Followers: [{ nickname: 'a'}, {nickname: 'b'}, {nickname: 'c'}],
})


const reducer = (state = initialState, action) => {
    switch(action.type) {
        // 로그인
        case LOG_IN_REQUEST :
            return {
                ...state,
                logInLoading: true,
                logInError: null,
                logInDone: false
            };
        
        case LOG_IN_SUCCESS :
            console.log("LOG_IN_SUCCESS")
            console.log(action.data)
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                me: dummyUser(action.data)
            }
        case LOG_IN_FAILURE :
            return {
                ...state,
                logInLoading: false,
                logInError: action.error,
            }

        // 로그아웃
        case LOG_OUT_REQUEST :
            return {
                ...state,
                logOutLoading: true,
                logOutError: null,
                logOutDone: false
            };
            
        case LOG_OUT_SUCCESS :
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                me: null
            }
        case LOG_OUT_FAILURE :
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error
            }

        // 회원가입
        case SIGN_UP_REQUEST :
            return {
                ...state,
                signUpLoading: true,
                signUpError: null,
                signUpDone: false
            };
            
        case SIGN_UP_SUCCESS :
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
            }
        case SIGN_UP_FAILURE :
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.error
            }    

            
        // 닉네임 수정
        case CHANGE_NICK_REQUEST :
            return {
                ...state,
                changeNickLoading: true,
                changeNickError: null,
                changeNickDone: false
            };
            
        case CHANGE_NICK_SUCCESS :
            return {
                ...state,
                changeNickLoading: false,
                changeNickDone: true,
            }
        case CHANGE_NICK_FAILURE :
            return {
                ...state,
                changeNickLoading: false,
                changeNickError: action.error
            }    

        // 
        case ADD_POST_TO_ME:
            return {
                ...state,
                me: {
                    ...state.me,
                    Posts: [{id: action.data}, ...state.me.Posts]
                }
            }
        case REMOVE_POST_OF_ME:
            return { 
                ...state,
                me: {
                    ...state.me,
                    Posts: state.me.Posts.fillter( (v) => v.id !== action.data)
                }

            }   
        default:
            return state;  
    }

}



export default reducer;