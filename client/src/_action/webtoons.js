import {
  GET_ALL_WEBTOONS_FULLFILLED,
  GET_ALL_WEBTOONS_PENDING,
  GET_ALL_WEBTOONS_REJECTED,
} from '../config/setConst';

export const axiosFetchData = set => {
  return {
    type: GET_ALL_WEBTOONS_PENDING,
    payload: set,
  };
};

export const axiosFetchDataFullfilled = data => {
  return {
    type: GET_ALL_WEBTOONS_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const axiosFetchDataRejected = err => {
  return {
    type: GET_ALL_WEBTOONS_REJECTED,
    payload: err,
    isLoading: false,
  };
};
