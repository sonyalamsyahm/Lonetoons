import {
  axiosFetchData,
  axiosFetchDataFullFilled,
  axiosFetchDataRejected,
} from '../_action/episodes';

import {URL} from '../config/api';

const episodes = id_webtoon => {
  return dispatch => {
    dispatch(axiosFetchData(false));
    URL.get(`webtoon/${id_webtoon}/episodes`)
      .then(res => {
        dispatch(axiosFetchDataFullFilled(res.data));
      })
      .catch(error => {
        dispatch(axiosFetchDataRejected(error));
      });
  };
};

export default episodes;
