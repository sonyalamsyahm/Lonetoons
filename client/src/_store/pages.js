import {
  pagesFetchData,
  pagesFetchDataFullFilled,
  pagesFetchDataRejected,
} from '../_action/pages';

import {URL} from '../config/api';

const pages = (id_webtoon, id_episode) => {
  return dispatch => {
    dispatch(pagesFetchData(false));
    URL.get(`webtoon/${id_webtoon}/episode/${id_episode}`)
      .then(res => {
        dispatch(pagesFetchDataFullFilled(res.data));
      })
      .catch(error => {
        dispatch(pagesFetchDataRejected(error));
      });
  };
};

export default pages;
