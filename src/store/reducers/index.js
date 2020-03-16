import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SearchReducer from './SearchReducer';

const appReducer = combineReducers({
  LoginReducer,
  SearchReducer
});

export default appReducer;
