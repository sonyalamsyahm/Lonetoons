import {
  GET_PROFILE_PENDING,
  GET_PROFILE_FULLFILLED,
  GET_PROFILE_REJECTED,
} from '../config/setConst';

export const profileGetData = set => {
  return {
    type: GET_PROFILE_PENDING,
    payload: set,
  };
};

export const profileGetDataFullfilled = data => {
  return {
    type: GET_PROFILE_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const profileGetDataRejected = err => {
  return {
    type: GET_PROFILE_REJECTED,
    payload: err,
    isLoading: false,
  };
};
