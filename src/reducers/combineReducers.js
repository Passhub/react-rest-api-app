import { combineReducers } from 'redux';

import users from './users';
import posts from './posts';
import todos from './todos';

export default combineReducers({
  users,
  posts,
  todos,
})