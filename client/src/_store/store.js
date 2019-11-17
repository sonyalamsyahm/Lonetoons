import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import webtoons from '../_reducers/webtoons';
import favorites from '../_reducers/favorites';
import episodes from '../_reducers/episodes';
import pages from '../_reducers/pages';
import profile from '../_reducers/profile';

//global state
const rootReducer = combineReducers({
  webtoons,
  favorites,
  episodes,
  pages,
  profile,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
