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
	}

	componentDidMount() {
		this.setLocalState();
	}

	componentDidUpdate(prevProps) {
		// console.log('term: ', this.props.match.params.term);
		// console.log(
		// 	'includes search: ',
		// 	this.props.location.pathname.includes('/search')
		// );
		let previous = '';
		let current = '';
		if (this.props.location.pathname.includes('/search')) {
			const prevPropsSearch = prevProps.match.params.searchIndex;
			const propsSearch = this.props.match.params.searchIndex;
			previous = prevPropsSearch !== undefined ? prevPropsSearch : 0;

			current = propsSearch !== undefined ? propsSearch : 0;
		} else {
			const prevPropsUsers = prevProps.match.params.usersIndex;
			const propsUsers = this.props.match.params.usersIndex;
			previous = prevPropsUsers !== undefined ? prevPropsUsers : 0;

			current = propsUsers !== undefined ? propsUsers : 0;
		}
		// console.log('previous: ', previous, 'current: ', current);

		if (previous !== current) {
			this.setLocalState();
		}
	}

	setLocalState = () => {
		// console.log('props: ', this.props);
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
						searchIndex ? '/' + searchIndex : ''
					}`
				)
				.then(resp => resp.data)
				.then(({ count, users }) => {
					// console.log('count: ', count);
					// console.log('users: ', users);
					this.setState(
						{ count, users, term }
						//  () =>
						// console.log('state from search: ', this.state)
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
					this.setState(
						{ count, users }
						// () =>
						// console.log('state from users: ', this.state)
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
					this.setState({ count, users, term }, () =>
						console.log('state after onSubmit search: ', this.state)
					);
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

		// console.log('location: ', location);

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

							// const color = email.includes('Zachary') ? `gold` : `black`;
							const color = 'gold';
							// .replace(regex, `<span>${matchStr}</span>`)
							var regex = /(Zachary)/g;
							var matchStr = 'Zachary';

							const highlight = (text, word) => {
								const regex = new RegExp('(' + word + ')', 'gi');
								// const regex = /(word)/gi;
								// console.log('regex: ', regex);
								// console.log('orig text: ', text);
								// text.replace(regex, '$&,');

								const result = text.replace(
									regex,
									(str, matched, offset, input) => {
										// console.log('matched: ', `<span>${matched}</span>`);
										return `<span class='highlight'>${matched}</span>`;
									}
								);

								console.log('new text: ', result);
								return result;
							};
							console.log(highlight(email, term));

							const _email = term ? highlight(email, term) : email;
							const _middleName = term
								? highlight(middleName, term)
								: middleName;

							return (
								<tr key={id}>
									<td>{firstName}</td>
									<td>{lastName}</td>
									<td>{_middleName}</td>
									<td>
										<div
											dangerouslySetInnerHTML={{
												__html: highlight(email, term)
											}}
										/>
									</td>
									{/* <td>{_email}</td> */}
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
