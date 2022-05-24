import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { 
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, REGISTER_MODAL_REQUEST, LOGIN_MODAL_REQUEST, 
} from '../reducers/user';
import AuthService from '../../service/user/Auth.service';


function* logIn(action) {
  const history = action.history
  try {
    yield AuthService.login(action.username, action.password)
    yield put({       
      type: LOG_IN_SUCCESS, 
    }) 
    alert("로그인이 완료되었습니다.")
    yield put({       
      type: LOGIN_MODAL_REQUEST, 
    }) 
    window.location.reload();
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error : err.response.data
    })
    alert(err.response.data.message)
  }  
}

function* logOut(action) {
  try {
    yield put({       
      type: LOG_OUT_SUCCESS, 
    }) 
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error : err.response.data
    })
  }  
}

function* signUp(action) {
  try {
    yield AuthService.register(action.username, action.password, action.authen)
    yield put({       
      type: SIGNUP_SUCCESS, 
      data: action.data
    }) 
    alert("회원가입이 성공되었습니다.")
    yield put({       
      type: REGISTER_MODAL_REQUEST, 
    }) 
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error : err.response.data
    })
    alert(err.response.data.message)
  }  
}



function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

export default function* userSage() {
    yield all([
      fork(watchLogIn),
      fork(watchLogOut),
      fork(watchSignUp),
    ])
  }