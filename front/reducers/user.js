import produce from '../util/produce';

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

    followLoading: false, // 팔로우 로딩
    followDone: false,
    followError: null,

    unfollowLoading: false, // 언팔로우 로딩
    unfollowDone: false,
    unfollowError: null,

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
    return produce(state, (draft) => {
        switch(action.type) {
            // 로그인
            case LOG_IN_REQUEST :
                draft.logInLoading = true
                draft.logInError = null
                draft.logInDone = false
                break
            
            case LOG_IN_SUCCESS :
                draft.logInLoading = false
                draft.logInDone = true
                draft.me = dummyUser(action.data)
                break

            case LOG_IN_FAILURE :
                draft.logInLoading = false
                draft.logInError = action.error
                break
    
            // 로그아웃
            case LOG_OUT_REQUEST :
                draft.logOutLoading = true
                draft.logOutError = null
                draft.logOutDone = false
                break
                
            case LOG_OUT_SUCCESS :
                draft.logOutLoading = false
                draft.logOutDone = true
                draft.me = null
                break

            case LOG_OUT_FAILURE :
                draft.logOutLoading = false
                draft.logOutError = action.error
                break
    
            // 회원가입
            case SIGN_UP_REQUEST :
                draft.signUpLoading = true
                draft.signUpError = null
                draft.signUpDone = false
                break
                
            case SIGN_UP_SUCCESS :
                draft.signUpLoading = false
                draft.signUpDone = true
                break

            case SIGN_UP_FAILURE :
                draft.signUpLoading = false
                draft.signUpError = action.error
                break
                
            // 닉네임 수정
            case CHANGE_NICK_REQUEST :
                draft.changeNickLoading = true
                draft.changeNickError = null
                draft.changeNickDone = false
                break
                
            case CHANGE_NICK_SUCCESS :
                draft.changeNickLoading = false
                draft.changeNickDone = true
                break

            case CHANGE_NICK_FAILURE :
                draft.changeNickLoading = false
                draft.changeNickError = action.error
                break

            // 
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({id: action.data})
                break
                
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.fillter((v) => v.id !== action.data)
                break

            // 팔로우
            case FOLLOW_REQUEST :
                draft.followLoading = true
                draft.followError = null
                draft.followDone = false
                break
            
            case FOLLOW_SUCCESS :
                draft.followLoading = false
                draft.followDone = true
                draft.me.Followings.push({ id: action.data })
                break

            case FOLLOW_FAILURE :
                draft.followLoading = false
                draft.followError = action.error
                break

            // 언팔로우
            case UNFOLLOW_REQUEST :
                draft.unfollowLoading = true
                draft.unfollowError = null
                draft.unfollowDone = false
                break
            
            case UNFOLLOW_SUCCESS :
                draft.unfollowLoading = false
                draft.unfollowDone = true
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data)
                break

            case UNFOLLOW_FAILURE :
                draft.unfollowLoading = false
                draft.unfollowError = action.error
                break

            default:
                break
        }

    })

    
}



export default reducer;