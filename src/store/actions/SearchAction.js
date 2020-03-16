import * as API from '../../api/StartWarsAPI';
import { GET_ALL_PLANETS } from './ActionTypes';

export const getALLPlanets = (page) => (dispatch) =>
	API.getALLPlanets(page).then((res) => dispatch({ type: GET_ALL_PLANETS, data: res.data })).catch((error) => {
		throw Error(error);
	});

export const updateSearchCount = (timeStamp, restrictSearch) => (dispatch) => {
	dispatch({ type: 'UPDATE_SEARCH_COUNT', timeStamp, restrictSearch });
};

export const clearSearchCount = () => (dispatch) => {
	dispatch({ type: 'CLEAR_SEARCH_COUNT' });
};
