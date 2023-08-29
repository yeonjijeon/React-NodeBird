import { all, fork, put, takeLatest, delay, throttle} from 'redux-saga/effects'
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, 
         ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, generateDummyPost } from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'
import shortid from 'shortid'


function loadPostAPI(data) {
    return axios.get('/api/posts', data)
}

function addPostAPI(data) {
    return axios.post('/api/post', data)
}

function removePostAPI(data) {
    return axios.post('/api/remove', data)
}

function addCommentAPI(data) {
    return axios.post('/api/comment', data)
}


function* loadPosts(action) {
    try {
        yield delay(1000)
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10)
        })
    } catch(err) {
        console.log(err)
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data
        })

    }
}

function* addPost(action) {
    try {
        // const result = yield fork(addPostAPI, action.data)
        // fork는 비동기 함수 호출, call 동기함수 호출
        const id = shortid.generate()
        yield delay(1000)
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id: id,
                content: action.data
            }
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id
        })

    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })

    }
}

function* removePost(action) {
    try {
        yield delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
        })
    } catch(err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
        })
    }
}

function* addComment(action) {
    try {
        console.log(action.data)
        yield delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    } catch(err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })

    }
}


function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}


function* watchAddPost() {
    // 마지막 이벤트만 살린다 
    yield takeLatest(ADD_POST_REQUEST, addPost)
    // yield throttle(ADD_POST_REQUEST,addPost,2000)
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}


function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}



export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment)
    ])
}