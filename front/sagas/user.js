import { all, fork, put, takeLatest, delay } from 'redux-saga/effects'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, 
         LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
         SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/user'
import axios from 'axios'

function loginAPI(data) {
    return axios.post('/api/login', data)
}

function logOutAPI() {
    return axios.post('/api/logOut')
}

function signUpAPI() {
    return axios.post('/api/signUp')
}

function* login(action) {
    try {
        // const result = yield call(loginAPI, action.data)
        yield delay(1000)
        // fork는 비동기 함수 호출, call 동기함수 호출
        console.log("DDD")
        console.log(action.data)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch(err) {
        console.log(err)
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })

    }
}


function* logOut() {
    try {
        // const result = yield fork(logOutAPI)
        // fork는 비동기 함수 호출, call 동기함수 호출
        yield delay(1000)
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch(err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })

    }
}



function* signUp() {
    try {
        yield delay(1000)
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        })

    }
}

function* watchLogIn() {
    // take는 한번만 쓰고 끝 => 대안 takeEvery
    // takeLatest: 요청이 취소되는게 아니라 응답이 취소되기 때문에 서버에는 저장될수 있다
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}


export default function* userSaga() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
      fork(watchSignUp)
    ])
}