/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import { Spin, message } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import SWLogo from '../../assets/img/starwarslogo.png';
import * as LoginAction from '../../store/actions/LoginAction';

const Login = ({ page, history, people, loading, ...props }) => {
	useEffect(() => {
		if (page === 1) {
			props.getAllPeople(page);
		}
	}, []);

	useEffect(
		() => {
			if (page !== 1) {
				props.getAllPeople(page);
			}
		},
		[ page ]
	);

	return (
		<div className="App">
			<div className="starwars_main">
				{loading ? (
					<div className="login-loading">
						<Spin tip="Taking off..." size="large" />
					</div>
				) : (
					<Formik
						enableReinitialize
						initialValues={{
							username: '',
							password: '',
							people: people
						}}
						validate={(values) => {
							// check for user name and password
							const errors = {};
							if (!values.username.length) {
								errors.username = 'username is Required';
							}
							if (!values.password.length) {
								errors.password = 'password is Required';
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setSubmitting(false);
							const name = values.username && values.username.trim();
							const birth_year = values.password && values.password.trim();
							const validUser = _.filter(
								people,
								(item) => item.name === name && item.birth_year === birth_year
							);
							// redirect to search page only if user foucnd
							if (validUser && validUser.length) {
								history.push({
									pathname: '/searchPage',
									state: { username: name }
								});
							} else {
								message.error(`User and password in not valid`);
							}
							resetForm();
						}}
					>
						{({ values, isSubmitting, handleChange, errors, touched }) => {
							return (
								<Form className="login-section-form">
									<div>
										<img
											className="login-section-starwars_logo"
											src={SWLogo}
											alt="star wars logo"
										/>
									</div>
									<div className="login-section-form_signin">Sign In</div>

									<div className="login-section-form_signin">
										<input
											id="username"
											name="username"
											type="text"
											className="login-form-field"
											placeholder="Enter character name"
											onChange={handleChange}
											value={values.username}
										/>
										{touched.username && errors.username ? (
											<div style={{ color: 'red' }}>{errors.username}</div>
										) : null}
										<input
											id="password"
											name="password"
											type="password"
											className="login-form-field"
											placeholder="Enter password"
											onChange={handleChange}
											value={values.password}
										/>
										{touched.password && errors.password ? (
											<div style={{ color: 'red' }}>{errors.password}</div>
										) : null}
										<div className="">
											<button type="submit" className="login-button" disabled={isSubmitting}>
												Fly Now!
											</button>
										</div>
									</div>
								</Form>
							);
						}}
					</Formik>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	people: state.LoginReducer.people,
	page: state.LoginReducer.page,
	loading: state.LoginReducer.loading
});

const mapDispatchToProps = (dispatch) => ({
	getAllPeople: (page) => dispatch(LoginAction.getAllPeople(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
