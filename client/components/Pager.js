import React, { Component } from 'react';

// TODO - change to class because have a class method - gotoPage

export default ({ currentPage, totalPages, history, match }) => {
	const current = currentPage || 0;
	// const _current
	console.log('pager match: ', match);
	console.log('history: ', history);
	console.log('totalPages: ', totalPages);
	console.log('currentPage: ', currentPage);
	const { pathname } = history.location;
	// TODO - when do hard reload on search page, does not show user data
	const gotoPage = pageNum => {
		// console.log('pageNum: ', pageNum);
		// console.log('current: ', current);
		let path = '';
		// if (location.pathname.includes('/search')) {
		if (match.params.term) {
			path = `/users/search/${match.params.term}/${pageNum}`;
		} else {
			path = `/users/${pageNum}`;
		}
		return history.push(path);
	};
	return (
		<div id='pager' className='btn-group'>
			<button
				onClick={() => gotoPage(0)}
				className='btn btn-info'
				// disabled={
				// 	pathname === '/users' || pathname === '/users/0' ? ' disabled' : ''
				// }
				disabled={current === 1 ? ' disabled' : ''}
			>
				First
			</button>
			<button
				onClick={() => gotoPage(current - 2)}
				className='btn btn-info'
				// disabled={
				// 	pathname === '/users' || pathname === '/users/0' ? ' disabled' : ''
				// }
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
			{/* <button
				onClick={() => gotoPage(totalPages - 1)}
				className='btn btn-info'
				disabled={pathname === `/users/${totalPages - 1}` ? ' disabled' : ''}
			>
				Last
			</button> */}
			<button
				onClick={() => gotoPage(totalPages - 1)}
				className='btn btn-info'
				disabled={current === totalPages ? ' disabled' : ''}
			>
				Last
			</button>
		</div>
	);
};
