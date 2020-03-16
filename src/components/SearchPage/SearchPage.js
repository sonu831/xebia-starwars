import React, { Component, useEffect, useState } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';
import { connect } from 'react-redux';
import * as SearchPageAction from '../../store/actions/SearchAction';

const SearchPage = ({ location, history, page, loading, planets, search, ...props }) => {
	const username =  location.state && location.state.username || '';
	const [ filterPlanetObj, setFilterPlanetObj ] = useState({ filterPlanetList: [], totalPopulation: 0 });
	const [ searchText, setSearchText ] = useState('');
	useEffect(() => {
		if (page === 1) {
			props.getALLPlanets(page);
		}
		if(!username){
          history.push('/');
		}
	}, []);

	useEffect(
		() => {
			if (page !== 1) {
				props.getALLPlanets(page);
			}
		},
		[ page ]
	);

	// search input box handler
	const handlePlanetSearch = (args, planets, search, username, props) => {
		const searchString = args.target.value;
		if (searchString && searchString.length) {
			let isMoreThanOneMin = false;
			if (search.timeStamp) {
				const diff = Math.round((new Date().getTime() - search.timeStamp) / 60000);
				isMoreThanOneMin = diff > 1 ? true : false;
			}
			// Below logic to handle search request in a minute only 'Luke Skywalker' can make more than 15
			// in a minute
			if (search.count === 0) {
				props.updateSearchCount(new Date().getTime());
			} else if (isMoreThanOneMin) {
				props.clearSearchCount();
			} else if (username === 'Luke Skywalker') {
				props.updateSearchCount();
			} else if (search.count >= 13 && username !== 'Luke Skywalker') {
				props.updateSearchCount(null, true);
			} else {
				props.updateSearchCount(null, false);
			}
		}
        // check if more than 15 request reached
		if (!search.restrictSearch) {
			// Filter planet as per search string
			const filterPlanet =
				searchString &&
				searchString.length > 0 &&
				_.filter(planets, ({ name }) => {
					if (_.isEqual(_.toLower(name.substring(0, searchString.length)), _.toLower(searchString))) {
						return true;
					}
					return false;
				});
			if (filterPlanet && filterPlanet.length) {
				filterPlanet.sort((a, b) => {
					if (a.residents.length > b.residents.length) {
						return -1;
					}
					if (b.residents.length > a.residents.length) {
						return 1;
					}
					return 0;
				});
				const totalPopulation = _.reduce(
					filterPlanet,
					function(sum, n) {
						return sum + n.residents.length;
					},
					0
				);
				setFilterPlanetObj({ filterPlanetList: filterPlanet, totalPopulation: totalPopulation });
				console.log(totalPopulation);
			} else {
				setFilterPlanetObj({ filterPlanetList: [], totalPopulation: 0 });
			}
		} else {
			message.error(`${username} can not make search more than 15 times in a minute`);
			setFilterPlanetObj({ filterPlanetList: [], totalPopulation: 0 });
		}

		setSearchText(searchString || '');
	};

	return (
		<div className="search_page">
			<div className="search_page_content">
				<div className="log-out">
					<button
						className="log-out-button"
						onClick={() => {
							history.push('/');
						}}
					>
						Log out
					</button>
				</div>
				<div className="search_page-character">Hello, {username}.</div>
				{loading ? (
					<div className="search-loading">
						<Spin tip="Loading planets..." size="large" />
					</div>
				) : (
					<div>
						<div className="search_page-search-title">Search the Galaxy</div>
						<div className="search_page-search_box">
							<input
								id="search"
								name="search"
								type="text"
								placeholder="Enter Planet name"
								onChange={(args) => handlePlanetSearch(args, planets, search, username, props)}
								value={searchText}
								className="search-box"
							/>
						</div>
						<div className="search-results-component">
							{filterPlanetObj.filterPlanetList.length > 0 &&
								filterPlanetObj.filterPlanetList.map((planet, index) => {
									const { name, residents } = planet;
									const peopleCount = residents.length;
                                   // Below return function return the component for each planet
									return (
										<div key={`planet_${index}`}>
											<div className="search-results-text">
												<div
													style={{
														fontSize: `${peopleCount === 0 ? 50 : peopleCount * 90}%`
													}}
												>
													{name}
													<br />
													{peopleCount}
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	planets: state.SearchReducer.planets,
	page: state.SearchReducer.page,
	loading: state.SearchReducer.loading,
	search: state.SearchReducer.search
});

const mapDispatchToProps = (dispatch) => ({
	getALLPlanets: (page) => dispatch(SearchPageAction.getALLPlanets(page)),
	updateSearchCount: (timeStamp, restrictSearch) =>
		dispatch(SearchPageAction.updateSearchCount(timeStamp, restrictSearch)),
	clearSearchCount: () => dispatch(SearchPageAction.clearSearchCount())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));
