import {
  GET_PAGES_REJECTED,
  GET_PAGES_PENDING,
  GET_PAGES_FULLFILLED,
} from '../config/setConst';

const initialState = {
  data: [],
  isLoading: true,
  err: null,
};

const pages = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGES_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        err: null,
      };
    case GET_PAGES_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_PAGES_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default pages;
