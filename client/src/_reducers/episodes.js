import {
  GET_EPISODES_PENDING,
  GET_EPISODES_FULLFILLED,
  GET_EPISODES_REJECTED,
} from '../config/setConst';

const initialState = {
  data: [],
  isLoading: true,
  err: null,
};

const episodes = (state = initialState, action) => {
  switch (action.type) {
    case GET_EPISODES_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        err: null,
      };
    case GET_EPISODES_FULLFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case GET_EPISODES_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default episodes;
