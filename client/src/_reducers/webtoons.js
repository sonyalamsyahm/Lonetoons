import {
  GET_ALL_WEBTOONS_FULLFILLED,
  GET_ALL_WEBTOONS_REJECTED,
  GET_ALL_WEBTOONS_PENDING,
} from '../config/setConst';

const initialState = {
  data: [],
  isLoading: true,
  err: null,
};

const webtoons = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WEBTOONS_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_ALL_WEBTOONS_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        err: null,
      };
    case GET_ALL_WEBTOONS_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default webtoons;
