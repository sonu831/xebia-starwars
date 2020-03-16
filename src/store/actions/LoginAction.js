import * as API from '../../api/StartWarsAPI';
import {GET_ALL_PEOPLE,LOGIN_USER} from './ActionTypes'

export const getAllPeople = (page) => dispatch =>
API.getAllPeople(page)
  .then(res => dispatch({type: GET_ALL_PEOPLE,data:res.data}))
  .catch(error => {
    throw error;
  });

