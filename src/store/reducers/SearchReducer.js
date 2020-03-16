import _ from 'lodash';
import { GET_ALL_PLANETS, UPDATE_SEARCH_COUNT, CLEAR_SEARCH_COUNT } from '../actions/ActionTypes';

export default (
	state = {
		planets: [],
		page: 1,
		loading: true,
		search: { count: 0, timeStamp: null, restrictSearch: false }
	},
	action
) => {
	switch (action.type) {
		case GET_ALL_PLANETS:
			const { page, planets } = state;
			const newPage = action.data.next ? page + 1 : page;
			const addedPlanets = planets.length ? _.concat(planets, action.data.results) : action.data.results;
			return {
				...state,
				planets: addedPlanets,
				page: newPage,
				loading: action.data.next ? true : false
			};
		case UPDATE_SEARCH_COUNT:
			const newSearch = {
				count: state.search.count + 1,
				timeStamp: action.timeStamp ? action.timeStamp : state.search.timeStamp,
				restrictSearch: action.restrictSearch ? action.restrictSearch : false
			};
			return {
				...state,
				search: newSearch
			};
		case CLEAR_SEARCH_COUNT:
			return {
				...state,
				search: { count: 0, timeStamp: null, restrictSearch: false }
			};
		default:
			return state;
	}
};
