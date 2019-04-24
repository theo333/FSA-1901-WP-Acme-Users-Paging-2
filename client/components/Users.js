import React, { Component } from 'react';
import axios from 'axios';

import Pager from './Pager';
import SearchForm from './SearchForm';
import { displayHighlight } from './Highlight';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			users: [],
			term: '',
			errors: []
		};
	}

	componentDidMount() {
		this.setLocalState();
	}

	componentDidUpdate(prevProps) {
		let previous = '';
		let current = '';
		// search route
		if (this.props.location.pathname.includes('/search')) {
			const prevPropsSearch = prevProps.match.params.searchIndex;
			const propsSearch = this.props.match.params.searchIndex;

			previous = prevPropsSearch !== undefined ? prevPropsSearch : 0;

			current = propsSearch !== undefined ? propsSearch : 0;
		}
		// users route
		else {
			const prevPropsUsers = prevProps.match.params.usersIndex;
			const propsUsers = this.props.match.params.usersIndex;

			previous = prevPropsUsers !== undefined ? prevPropsUsers : 0;

			current = propsUsers !== undefined ? propsUsers : 0;
		}

		// update state if changed page
		if (previous !== current) {
			this.setLocalState();
		}
	}

	setLocalState = () => {
		// search route
		if (this.props.location.pathname.includes('/search')) {
			const term =
				this.props.match.params.term !== undefined
					? this.props.match.params.term
					: '';

			const searchIndex =
				this.props.match.params.searchIndex !== undefined
					? this.props.match.params.searchIndex
					: '';
			axios
				.get(
					`https://acme-users-api.herokuapp.com/api/users/search/${term}${
						searchIndex ? '/' + searchIndex : ''
					}`
				)
				.then(resp => resp.data)
				.then(({ count, users }) => {
					this.setState({ count, users, term });
				})
				.catch(err => {
					this.setState({ errors: [...this.state.errors, err] }, () =>
						console.log(this.state)
					);
				});
		}
		// users route
		else {
			const usersIndex =
				this.props.match.params.usersIndex !== undefined
					? this.props.match.params.usersIndex
					: '';
			axios
				.get(
					`https://acme-users-api.herokuapp.com/api/users/${
						usersIndex ? usersIndex : ''
					}`
				)
				.then(resp => resp.data)
				.then(({ count, users }) => {
					this.setState({ count, users });
				})
				.catch(err => {
					this.setState({ errors: [...this.state.errors, err] }, () =>
						console.log(this.state)
					);
				});
		}
	};

	// note: set up method this way in order to be able to pass in term param, otherwise only takes ev (event)
	onSubmit = term => {
		return ev => {
			ev.preventDefault();
			axios
				.get(`https://acme-users-api.herokuapp.com/api/users/search/${term}`)
				.then(resp => resp.data)
				.then(({ count, users }) => {
					this.setState({ count, users, term });
				})
				.then(() => this.props.history.push(`/users/search/${term}`))
				.catch(err => console.log(err));
		};
	};

	render() {
		const { count, users, term } = this.state;
		const tableHeaders = [
			'First Name',
			'Last Name',
			'Middle Name',
			'Email',
			'Title'
		];
		const { match, history, location } = this.props;

		let currentPage = '';

		if (location.pathname.includes('/search')) {
			currentPage = match.params.searchIndex
				? Number(match.params.searchIndex) + 1
				: 1;
		} else {
			currentPage = match.params.usersIndex
				? Number(match.params.usersIndex) + 1
				: 1;
		}

		const totalPages = Math.ceil(count / 50);

		return (
			<div>
				<div id='stats'>
					{count} Results. Page {currentPage} of {totalPages}
				</div>

				<Pager
					currentPage={currentPage}
					totalPages={totalPages}
					history={history}
					match={match}
				/>
				<SearchForm onSubmit={this.onSubmit} history={history} />

				<table className='table table-striped'>
					<thead>
						<tr>
							{tableHeaders.map(header => {
								return <th key={header}>{header}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{users.map(user => {
							const {
								id,
								firstName,
								lastName,
								middleName,
								email,
								title
							} = user;

							const userFields = [
								firstName,
								lastName,
								middleName,
								email,
								title
							];
							return (
								<tr key={id}>
									{userFields.map((field, idx) => {
										return <td key={idx}>{displayHighlight(field, term)}</td>;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
