import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Pager from './Pager';
import SearchForm from './SearchForm';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			users: [],
			term: ''
		};
		console.log(this.props);
	}

	componentDidMount() {
		this.setLocalState();
	}

	componentDidUpdate(prevProps) {
		const previous =
			prevProps.match.params.usersIndex !== undefined
				? prevProps.match.params.usersIndex
				: 0;

		const current =
			this.props.match.params.usersIndex !== undefined
				? this.props.match.params.usersIndex
				: 0;
		// const previous =
		// 	prevProps.match.url !== undefined ? prevProps.match.url : 'users/0';

		// const current =
		// 	this.props.match.url !== undefined ? this.props.match.url : 'users/0';

		if (previous !== current) {
			this.setLocalState();
		}
	}

	setLocalState = () => {
		console.log('props: ', this.props);
		// if ((this.props.location.pathname === '/search')) {
		// if (this.props.match.url === '/search') {
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
						searchIndex ? searchIndex + '/' : ''
					}`
				)
				.then(resp => resp.data)
				.then(({ count, users }) => {
					// console.log('count: ', count);
					// console.log('users: ', users);
					this.setState({ count, users }, () =>
						console.log('state from search: ', this.state)
					);
				})

				.catch(err => console.log(err));
		} else {
			// if (this.props.location.pathname === '/users') {
			// if (this.props.match.url === '/users') {
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
					// console.log('count: ', count);
					// console.log('users: ', users);
					this.setState({ count, users }, () =>
						console.log('state from users: ', this.state)
					);
				})

				.catch(err => console.log(err));
		}
	};

	onSubmit = term => {
		return ev => {
			console.log('ev: ', ev);
			ev.preventDefault();
			console.log('onSubmit');
			axios
				.get(`https://acme-users-api.herokuapp.com/api/users/search/${term}`)
				.then(resp => resp.data)
				.then(({ count, users }) => {
					// console.log('count: ', count);
					// console.log('users: ', users);
					this.setState({ count, users }, () =>
						console.log('state after onSubmit search: ', this.state)
					);
				})
				.then(() => this.props.history.push(`/users/search/${term}`))

				.catch(err => console.log(err));
		};
	};

	render() {
		const { count, users } = this.state;
		const tableHeaders = [
			'First Name',
			'Last Name',
			'Middle Name',
			'Email',
			'Title'
		];
		const { match, history } = this.props;
		const currentPage = match.params.usersIndex
			? Number(match.params.usersIndex) + 1
			: 1;
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
				<SearchForm onSubmit={this.onSubmit} />
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

							// const color = email.includes('Zachary') ? `gold` : `black`;
							const color = 'gold';
							// .replace(regex, `<span>${matchStr}</span>`)
							var regex = /(Zachary)/g;
							var matchStr = 'Zachary';
							return (
								<tr key={id}>
									<td>{firstName}</td>
									<td>{lastName}</td>
									<td>{middleName}</td>
									<td>{email}</td>
									{/* <td>{email.replace(matchStr, `${<span>Zachary</span>}`)}</td> */}
									<td>{title}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
