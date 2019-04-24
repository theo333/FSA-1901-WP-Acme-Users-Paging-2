import React, { Component } from 'react';

export default class Pager extends Component {
	constructor(props) {
		super(props);
	}

	gotoPage = pageNum => {
		const { match, history } = this.props;
		let path = '';
		if (match.params.term) {
			path = `/users/search/${match.params.term}/${pageNum}`;
		} else {
			path = `/users/${pageNum}`;
		}
		return history.push(path);
	};

	render() {
		const { gotoPage } = this;
		const { currentPage, totalPages } = this.props;
		const current = currentPage || 0;

		// TODO - when do hard reload on search page, does not show user data

		return (
			<div id='pager' className='btn-group'>
				<button
					onClick={() => gotoPage(0)}
					className='btn btn-info'
					disabled={current === 1 ? ' disabled' : ''}
				>
					First
				</button>
				<button
					onClick={() => gotoPage(current - 2)}
					className='btn btn-info'
					disabled={current === 1 ? ' disabled' : ''}
				>
					Prev
				</button>
				<span className='btn btn-primary'>{currentPage}</span>
				<button
					onClick={() => gotoPage(current)}
					className='btn btn-info'
					disabled={current === totalPages ? ' disabled' : ''}
				>
					Next
				</button>
				<button
					onClick={() => gotoPage(totalPages - 1)}
					className='btn btn-info'
					disabled={current === totalPages ? ' disabled' : ''}
				>
					Last
				</button>
			</div>
		);
	}
}
