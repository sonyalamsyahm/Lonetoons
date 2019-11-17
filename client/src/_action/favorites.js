import {
  GET_FAV_WEBTOON,
  POST_FAV_WEBTOON,
  DELETE_FAV_WEBTOON,
  GET_FAVS_PENDING,
  GET_FAVS_FULFILLED,
  GET_FAVS_REJECTED,
  POST_FAV_PENDING,
  POST_FAV_FULFILLED,
  POST_FAV_REJECTED,
  DEL_FAV_PENDING,
  DEL_FAV_FULFILLED,
  DEL_FAV_REJECTED,
} from '../config/setConst';

export const axiosfetchData = (method, webtoon_id, bool) => {
  let methodType;

  switch (method) {
    case GET_FAV_WEBTOON:
      methodType = GET_FAVS_PENDING;
      break;
    case POST_FAV_WEBTOON:
      methodType = POST_FAV_PENDING;
      break;
    case DELETE_FAV_WEBTOON:
      methodType = DEL_FAV_PENDING;
      break;
  }
  return {
    type: methodType,
    payload: bool,
    toon_id: webtoon_id,
  };
};

export const axiosfetchDataFulfilled = (method, data) => {
  let methodType;

  switch (method) {
    case GET_FAV_WEBTOON:
      methodType = GET_FAVS_FULFILLED;
      break;
    case POST_FAV_WEBTOON:
      methodType = POST_FAV_FULFILLED;
      break;
    case DELETE_FAV_WEBTOON:
      methodType = DEL_FAV_FULFILLED;
      break;
  }
  return {
    type: methodType,
    payload: data,
    isLoading: false,
  };
};

export const axiosfetchDataRejected = (method, error) => {
  let methodType;

  switch (method) {
    case GET_FAV_WEBTOON:
      methodType = GET_FAVS_REJECTED;
      break;
    case POST_FAV_WEBTOON:
      methodType = POST_FAV_REJECTED;
      break;
    case DELETE_FAV_WEBTOON:
      methodType = DEL_FAV_REJECTED;
      break;
  }
  return {
    type: methodType,
    payload: error,
    isLoading: false,
  };
};
