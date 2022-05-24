import produce from 'immer';

export const initialState = {
    item: [],
    itemOne: {},

    createItemLoading: false,
    createItemDone: false,
    createItemError: null,

    getItemLoading: false,
    getItemDone: false,
    getItemError: null,

    getItemOneLoading: false,
    getItemOneDone: false,
    getItemOneError: null,

    updateItemLoading: false,
    updateItemDone: false,
    updateItemError: null,

    deleteItemLoading: false,
    deleteItemDone: false,
    deleteItemError: null,

    likeItemLoading: false,
    likeItemDone: false,
    likeItemError: null,

    unlikeItemLoading: false,
    unlikeItemDone: false,
    unlikeItemError: null,
}
export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';

export const GET_ITEM_REQUEST = 'GET_ITEM_REQUEST';
export const GET_ITEM_SUCCESS = 'GET_ITEM_SUCCESS';
export const GET_ITEM_FAILURE = 'GET_ITEM_FAILURE';

export const GET_ITEM_ONE_REQUEST = 'GET_ITEM_ONE_REQUEST';
export const GET_ITEM_ONE_SUCCESS = 'GET_ITEM_ONE_SUCCESS';
export const GET_ITEM_ONE_FAILURE = 'GET_ITEM_ONE_FAILURE';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';

export const LIKE_ITEM_REQUEST = 'LIKE_ITEM_REQUEST';
export const LIKE_ITEM_SUCCESS = 'LIKE_ITEM_SUCCESS';
export const LIKE_ITEM_FAILURE = 'LIKE_ITEM_FAILURE';

export const UNLIKE_ITEM_REQUEST = 'UNLIKE_ITEM_REQUEST';
export const UNLIKE_ITEM_SUCCESS = 'UNLIKE_ITEM_SUCCESS';
export const UNLIKE_ITEM_FAILURE = 'UNLIKE_ITEM_FAILURE';



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case CREATE_ITEM_REQUEST:
                draft.createItemLoading=true;
                draft.createItemDone=false;
                draft.createItemError=null;
                break;
            case CREATE_ITEM_SUCCESS:
                draft.createItemLoading=false;
                draft.createItemDone=true;
                break;
            case CREATE_ITEM_FAILURE:
                draft.createItemDone=false;
                draft.createItemError=action.error;
                break;
            
            case GET_ITEM_REQUEST:
                draft.getItemLoading=true;
                draft.getItemDone=false;
                draft.getItemError=null;
                break;
            case GET_ITEM_SUCCESS:
                draft.getItemLoading=false;
                draft.getItemDone=true;
                draft.item = action.data;
                break;
            case GET_ITEM_FAILURE:
                draft.getItemDone=false;
                draft.getItemError=action.error;
                break;
            
            case GET_ITEM_ONE_REQUEST:
                draft.getItemOneLoading=true;
                draft.getItemOneDone=false;
                draft.getItemOneError=null;
                break;
            case GET_ITEM_ONE_SUCCESS:
                draft.getItemOneLoading=false;
                draft.getItemOneDone=true;
                draft.itemOne = action.data;
                break;
            case GET_ITEM_ONE_FAILURE:
                draft.getItemOneDone=false;
                draft.getItemOneError=action.error;
                break;

            case UPDATE_ITEM_REQUEST:
                draft.updateItemLoading=true;
                draft.updateItemDone=false;
                draft.updateItemError=null;
                break;
            case UPDATE_ITEM_SUCCESS:
                draft.updateItemLoading=false;
                draft.updateItemDone=true;
                break;
            case UPDATE_ITEM_FAILURE:
                draft.updateItemDone=false;
                draft.updateItemError=action.error;
                break;

            case DELETE_ITEM_REQUEST:
                draft.deleteItemLoading=true;
                draft.deleteItemDone=false;
                draft.deleteItemError=null;
                break;
            case DELETE_ITEM_SUCCESS: {
                const itemData = draft.item.filter((v) => v.itemId !== action.data.itemId)
                draft.item = itemData
                draft.deleteItemLoading=false;
                draft.deleteItemDone=true;
                break;
            }
            case DELETE_ITEM_FAILURE:
                draft.deleteItemDone=false;
                draft.deleteItemError=action.error;
                break;

            case LIKE_ITEM_REQUEST:
                draft.likeItemLoading=true;
                draft.likeItemDone=false;
                draft.likeItemError=null;
                break;
            case LIKE_ITEM_SUCCESS: {
                const itemId = draft.item.find((v) => v.itemId === action.data.item);
                itemId.likes.push({item: action.data.item, user: action.data.user})
                draft.likeItemLoading=false;
                draft.likeItemDone=true;
                break;
            }
            case LIKE_ITEM_FAILURE:
                draft.likeItemDone=false;
                draft.likeItemError=action.error;
                break;

            case UNLIKE_ITEM_REQUEST:
                draft.unlikeItemLoading=true;
                draft.unlikeItemDone=false;
                draft.unlikeItemError=null;
                break;
            case UNLIKE_ITEM_SUCCESS: {
                const itemId = draft.item.find((v) => v.itemId === action.data.item);
                itemId.likes = itemId.likes.filter((v) => v.user !== action.data.user)
                draft.unlikeItemLoading=false;
                draft.unlikeItemDone=true;
                break;
            }
            case UNLIKE_ITEM_FAILURE:
                draft.unlikeItemDone=false;
                draft.unlikeItemError=action.error;
                break;
            
            default:
                return state;
        }
    })
};

export default reducer;