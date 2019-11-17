import {
  axiosfetchData,
  axiosfetchDataFulfilled,
  axiosfetchDataRejected,
} from '../_action/favorites';
import {URL} from '../config/api';
import {
  GET_FAV_WEBTOON,
  DELETE_FAV_WEBTOON,
  POST_FAV_WEBTOON,
} from '../config/setConst';

const favorites = (method, user_id, webtoon_id) => {
  switch (method) {
    case GET_FAV_WEBTOON:
      return dispatch => {
        dispatch(axiosfetchData(method, null, true));
        URL.get(`/user/${user_id}/webtoon/favorites`)
          .then(res => {
            dispatch(axiosfetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(axiosfetchDataRejected(method, error));
          });
      };
    case POST_FAV_WEBTOON:
      return dispatch => {
        dispatch(axiosfetchData(method, webtoon_id, true));
        URL.post(`/user/${user_id}/webtoon/${webtoon_id}/favorite`)
          .then(res => {
            dispatch(axiosfetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(axiosfetchDataRejected(method, error));
          });
      };
    case DELETE_FAV_WEBTOON:
      return dispatch => {
        dispatch(axiosfetchData(method, webtoon_id, true));
        URL.delete(`/user/${user_id}/webtoon/${webtoon_id}/favorite`)
          .then(res => {
            dispatch(axiosfetchDataFulfilled(method, res.data));
          })
          .catch(error => {
            dispatch(axiosfetchDataRejected(method, error));
          });
      };
    default:
      return method;
  }
};

export default favorites;
