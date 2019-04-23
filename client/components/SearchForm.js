import React, { Component } from 'react';
import axios from 'axios';

export default class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			term: ''
		};
	}

	onSubmit = ev => {
		ev.preventDefault();
		console.log('onSubmit');
		axios
			.get(
				`https://acme-users-api.herokuapp.com/api/users/search/${
					this.state.term
				}`
			)
			.then(resp => resp.data)
			.then(users => {
				// this.setState();
				console.log('users: ', users);
			})
			.catch(err => console.log(err));
	};

	onChange = ev => {
		this.setState(
			{
				term: ev.target.value
			},
			() => console.log(this.state)
		);
	};

	render() {
		const { onChange, onSubmit } = this;
		return (
			<form onSubmit={onSubmit}>
				<input name='term' value={this.state.term} onChange={onChange} />
				<button type='submit'>Search</button>
			</form>
		);
	}
}
