import {
  axiosFetchData,
  axiosFetchDataFullfilled,
  axiosFetchDataRejected,
} from '../_action/webtoons';

import {URL} from '../config/api';
import Axios from 'axios';

const webtoons = (user_id, isSearch, title) => {
  return dispatch => {
    if (isSearch) {
      dispatch(axiosFetchData(false));
      URL.get(`user/${user_id}/all_webtoons?title=${title}`)
        .then(res => {
          dispatch(axiosFetchDataFullfilled(res.data));
        })
        .catch(err => {
          dispatch(axiosFetchDataRejected(err));
        });
    } else {
      dispatch(axiosFetchData(true));
      URL.get(`user/${user_id}/all_webtoons`)
        .then(res => {
          dispatch(axiosFetchDataFullfilled(res.data));
        })
        .catch(err => {
          dispatch(axiosFetchDataRejected(err));
        });
    }
  };
};

export default webtoons;
