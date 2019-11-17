import {
  GET_EPISODES_PENDING,
  GET_EPISODES_FULLFILLED,
  GET_EPISODES_REJECTED,
} from '../config/setConst';

export const axiosFetchData = set => {
  return {
    type: GET_EPISODES_PENDING,
    payload: set,
  };
};

export const axiosFetchDataFullFilled = data => {
  return {
    type: GET_EPISODES_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const axiosFetchDataRejected = err => {
  return {
    type: GET_EPISODES_REJECTED,
    payload: err,
    isLoading: false,
  };
};
