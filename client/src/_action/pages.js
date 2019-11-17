import {
  GET_PAGES_PENDING,
  GET_PAGES_FULLFILLED,
  GET_PAGES_REJECTED,
} from '../config/setConst';

export const pagesFetchData = set => {
  return {
    type: GET_PAGES_PENDING,
    payload: set,
  };
};

export const pagesFetchDataFullFilled = data => {
  return {
    type: GET_PAGES_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const pagesFetchDataRejected = err => {
  return {
    type: GET_PAGES_REJECTED,
    payload: err,
    isLoading: false,
  };
};
