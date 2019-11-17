import {
  profileGetData,
  profileGetDataFullfilled,
  profileGetDataRejected,
} from '../_action/profile';

import {URL} from '../config/api';
import {GET_METHOD, PUT_METHOD} from '../config/setConst';

export const Profile = (METHOD, user_id, name) => {
  return dispatch => {
    switch (METHOD) {
      case GET_METHOD:
        console.log('get ok');
        dispatch(profileGetData(true));
        URL.get(`user/${user_id}/profile`)
          .then(res => {
            dispatch(profileGetDataFullfilled(res.data));
          })
          .catch(error => {
            dispatch(profileGetDataRejected(error));
          });
        break;
      case PUT_METHOD:
        // console.log('put ok');
        console.log(METHOD, user_id, name);
        dispatch(profileGetData(true));
        URL.put(`user/${user_id}/profile`, {
          name,
        })
          .then(res => {
            dispatch(profileGetDataFullfilled(res.data));
          })
          .catch(error => {
            dispatch(profileGetDataRejected(error));
          });
        break;
    }
  };
};

export default Profile;
