import produce from 'immer';

export const initialState = {

    loginModal: false,
    registerModal: false,

    logInLoading: false,
    logInDone: false,
    logInError: null,

    signupLoading: false,
    signupDone: false,
    signupError: null,



    
}




export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOGIN_MODAL_REQUEST = 'LOGIN_MODAL_REQUEST';
export const REGISTER_MODAL_REQUEST = 'REGISTER_MODAL_REQUEST';


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOGIN_MODAL_REQUEST:
                draft.loginModal = !draft.loginModal;
                break;
            case REGISTER_MODAL_REQUEST:
                draft.registerModal = !draft.registerModal;
                break;

            case LOG_IN_REQUEST:
                draft.logInLoading=true;
                draft.logInDone=false;
                draft.logInError=null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading=false;
                draft.logInDone=true;
                draft.userId= action.data;
                break;
            case LOG_IN_FAILURE:
                draft.logInDone=false;
                draft.logInError=action.error;
                break;

            case SIGNUP_REQUEST:
                draft.signupLoading=true;
                draft.signupDone=false;
                draft.signupError=null;
                break;
            case SIGNUP_SUCCESS:
                draft.signupLoading=false;
                draft.signupDone=true;
                break;
            case SIGNUP_FAILURE:
                draft.signupDone=false;
                draft.signupError=action.error;
                break;
    
            
            default:
                return state;
        }
    })
};

export default reducer;