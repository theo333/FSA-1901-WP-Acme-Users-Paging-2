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
		const previous =
			prevProps.match.params.id !== undefined ? prevProps.match.params.id : 0;

		const current =
			this.props.match.params.id !== undefined ? this.props.match.params.id : 0;

		if (previous !== current) {
			this.setLocalState();
		}
	}

	setLocalState = () => {
		const id =
			this.props.match.params.id !== undefined
				? this.props.match.params.id
				: '';
		axios
			.get(`https://acme-users-api.herokuapp.com/api/users/${id ? id : ''}`)
			.then(resp => resp.data)
			.then(({ count, users }) => {
				// console.log('count: ', count);
				// console.log('users: ', users);
				this.setState(
					{ count, users }
					// () => console.log('state: ', this.state)
				);
			})

			.catch(err => console.log(err));
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
		const currentPage = match.params.id ? Number(match.params.id) + 1 : 1;
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
				<SearchForm />
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
