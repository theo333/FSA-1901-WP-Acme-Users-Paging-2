import React, { Component } from 'react';
import axios from 'axios';

export default class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			term: ''
		};
	}

	// TODO - why term does not stay in search field on hard refresh
	onChange = ev => {
		// console.log('ev: ', ev);
		this.setState(
			{
				term: ev.target.value
			}
			// () => console.log(this.state)
		);
	};

	clear = () => {
		// console.log('history: ', this.props);
		this.props.history.push('/users');
	};

	render() {
		const { onChange, clear } = this;
		const { onSubmit } = this.props;
		const { term } = this.state;
		return (
			<form id='search-form' onSubmit={onSubmit(term)} className='input-group'>
				<input
					name='term'
					value={this.state.term}
					onChange={onChange}
					placeholder='Search Results'
					className='form-control'
				/>
				<div className='input-group-append'>
					<button type='submit' className='btn btn-primary'>
						Search
					</button>
					<button onClick={clear} className='btn btn-info'>
						Clear
					</button>
				</div>
			</form>
		);
	}
}
