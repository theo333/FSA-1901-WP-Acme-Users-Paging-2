import React, { Component } from 'react';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		};
	}

	// TODO - why term does not stay in search field after click search or on hard refresh
	onChange = ev => {
		// console.log('ev: ', ev);
		this.setState({
			term: ev.target.value
		});
	};

	clear = () => {
		this.props.history.push('/users');
	};

	render() {
		const { onChange, clear } = this;
		const { onSubmit, history } = this.props;
		const { term } = this.state;
		return (
			<form id='search-form' onSubmit={onSubmit(term)} className='input-group'>
				<input
					name='term'
					value={term}
					onChange={onChange}
					placeholder='Search Results'
					className='form-control'
				/>
				<div className='input-group-append'>
					<button
						type='submit'
						className='btn btn-primary'
						disabled={!term ? ' disabled' : ''}
					>
						Search
					</button>
					<button
						onClick={clear}
						className='btn btn-info'
						disabled={
							!history.location.pathname.includes('/search') ? ' disabled' : ''
						}
					>
						Clear
					</button>
				</div>
			</form>
		);
	}
}
