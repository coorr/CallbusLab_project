import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { CREATE_ITEM_FAILURE, CREATE_ITEM_REQUEST, CREATE_ITEM_SUCCESS, DELETE_ITEM_FAILURE, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, GET_ITEM_FAILURE, GET_ITEM_ONE_FAILURE, GET_ITEM_ONE_REQUEST, GET_ITEM_ONE_SUCCESS, GET_ITEM_REQUEST, GET_ITEM_SUCCESS, LIKE_ITEM_FAILURE, LIKE_ITEM_REQUEST, LIKE_ITEM_SUCCESS, UNLIKE_ITEM_FAILURE, UNLIKE_ITEM_REQUEST, UNLIKE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS } from '../reducers/item';
import ItemService from '../../service/item/Item.service';
import TokenCheck from '../store/tokenCheck';



function* createItem(action) {
  try {
    const history = action.history;
    yield ItemService.createItemUser(action.userId, action.itemData)
    yield put({       
      type: CREATE_ITEM_SUCCESS, 
    }) 
    history.push("/")
  } catch (err) {
    TokenCheck(err.response.data)
    yield put({
      type: CREATE_ITEM_FAILURE,
      error : err.response.data
    })
    alert("실패하였습니다.")
  }  
}

function* getItem(action) {
    try {
        const result = yield ItemService.getItemAll();
        yield put({       
        type: GET_ITEM_SUCCESS, 
        data: result.data
        }) 
    } catch (err) {
        TokenCheck(err.response.data)
        yield put({
        type: GET_ITEM_FAILURE,
        error : err.response.data
        })
        alert("실패하였습니다.")
    }  
}

function* getItemOne(action) {
    const history = action.history
    try {
        const result = yield ItemService.getItemById(action.itemId);
        yield put({       
        type: GET_ITEM_ONE_SUCCESS, 
        data: result.data
        }) 
    } catch (err) {
        yield put({
        type: GET_ITEM_ONE_FAILURE,
        error : err.response.data
        })
        TokenCheck(err.response.data)
        if(err.response.data.message) {
            alert(err.response.data.message)
        }
        history.push("/")
    }  
    
}

function* updateItem(action) {
    const history = action.history
    try {
        const result = yield ItemService.updateItemById(action.itemId, action.itemData);
        yield put({       
         type: UPDATE_ITEM_SUCCESS, 
         data: result.data
        }) 
        
    } catch (err) {
        yield put({
         type: UPDATE_ITEM_FAILURE,
         error : err.response.data
        })
        TokenCheck(err.response.data)
        if(err.response.data.message) {
            alert(err.response.data.message)
        }
    }  
    history.push("/")
}

function* deleteItem(action) {
    try {
        const result = yield ItemService.deleteItemById(action.itemId);
        yield put({       
         type: DELETE_ITEM_SUCCESS,
         data: result.data 
        }) 
    } catch (err) {
        yield put({
         type: DELETE_ITEM_FAILURE,
         error : err.response.data
        })
        TokenCheck(err.response.data)
        if(err.response.data.message) {
            alert(err.response.data.message)
        }
    }  
}

function* likeItem(action) {
    try {
        const result = yield ItemService.likeItemAndUserById(action.itemId, action.userId);
        yield put({       
         type: LIKE_ITEM_SUCCESS, 
         data: result.data
        }) 
    } catch (err) {
        yield put({
         type: LIKE_ITEM_FAILURE,
         error : err.response.data
        })
        TokenCheck(err.response.data)
        if(err.response.data.message) {
            alert(err.response.data.message)
        }
    }  
}

function* unlikeItem(action) {
    try {
        const result = yield ItemService.unlikeItemAndUserById(action.itemId, action.userId);
        yield put({       
         type: UNLIKE_ITEM_SUCCESS, 
         data: result.data
        }) 
    } catch (err) {
        yield put({
         type: UNLIKE_ITEM_FAILURE,
         error : err.response.data
        })
        TokenCheck(err.response.data)
        if(err.response.data.message) {
            alert(err.response.data.message)
        }
    }  
}

function* watchCreateItem() {
  yield takeLatest(CREATE_ITEM_REQUEST, createItem);
}
function* watchGetItem() {
    yield takeLatest(GET_ITEM_REQUEST, getItem);
}
function* watchGetItemOne() {
    yield takeLatest(GET_ITEM_ONE_REQUEST, getItemOne);
}
function* watchUpdateItem() {
    yield takeLatest(UPDATE_ITEM_REQUEST, updateItem);
}
function* watchDeleteItem() {
    yield takeLatest(DELETE_ITEM_REQUEST, deleteItem);
}
function* watchLikeItem() {
    yield takeLatest(LIKE_ITEM_REQUEST, likeItem);
}
function* watchUnlikeItem() {
    yield takeLatest(UNLIKE_ITEM_REQUEST, unlikeItem);
}


export default function* userSage() {
    yield all([
      fork(watchCreateItem),
      fork(watchGetItem),
      fork(watchGetItemOne),
      fork(watchUpdateItem),
      fork(watchDeleteItem),
      fork(watchLikeItem),
      fork(watchUnlikeItem),
    ])
  }