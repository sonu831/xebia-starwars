import _ from 'lodash';
import {
  GET_ALL_PEOPLE,
  } from '../actions/ActionTypes';
  
  export default (
    state = {
      people: [],
      page:1,
      loading:true,
     },
    action
  ) => {
    switch (action.type) {
      case GET_ALL_PEOPLE:
        const {page,people} = state;
        const newPage = action.data.next ? page +1 :page;
        const addedPeople =  people.length ? _.concat(people,action.data.results) : action.data.results;
        return {
          ...state,
          people: addedPeople,
          page: newPage,
          loading : action.data.next ? true:false,  
        };
      default:
        return state;
    }
  };
  