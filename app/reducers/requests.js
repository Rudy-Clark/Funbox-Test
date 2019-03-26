import { REQUEST, REQUEST_ERROR, REQUEST_SUCCESS } from '../actions';

const initialState = {
  loading: false,
  error: false,
  message: '',
};

function request(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return {
        loading: true,
        error: false,
        message: '',
      };
    case REQUEST_ERROR:
      return {
        loading: false,
        error: true,
        message: action.message,
      };
    case REQUEST_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default request;
