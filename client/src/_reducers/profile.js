import {
  GET_PROFILE_FULLFILLED,
  GET_PROFILE_PENDING,
  GET_PROFILE_REJECTED,
} from '../config/setConst';

const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case GET_PROFILE_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_PROFILE_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default profile;
