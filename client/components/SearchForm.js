import React, { Component } from 'react';
import axios from 'axios';

export default class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			term: ''
		};
	}

	// onSubmit = ev => {
	// 	ev.preventDefault();
	// 	console.log('onSubmit');
	// 	axios
	// 		.get(
	// 			`https://acme-users-api.herokuapp.com/api/users/search/${
	// 				this.state.term
	// 			}`
	// 		)
	// 		.then(resp => resp.data)
	// 		.then(users => {
	// 			// this.setState();
	// 			console.log('users: ', users);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	onChange = ev => {
		// console.log('ev: ', ev);
		this.setState(
			{
				term: ev.target.value
			},
			() => console.log(this.state)
		);
	};

	clear = () => {
		console.log('history: ', this.props);
		this.props.history.push('/users');
	};

	render() {
		const { onChange, clear } = this;
		const { onSubmit } = this.props;
		const { term } = this.state;
		return (
			<form onSubmit={onSubmit(term)}>
				<input name='term' value={this.state.term} onChange={onChange} />
				<button type='submit'>Search</button>
				<button onClick={clear}>Clear</button>
			</form>
		);
	}
}
