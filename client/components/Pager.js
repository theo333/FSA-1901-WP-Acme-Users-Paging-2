import React, { Component } from 'react';

// TODO - change to class because have a class method - gotoPage

export default ({ currentPage, totalPages, history, match }) => {
	// const current = Number(match.params.usersIndex) || 0;
	const current = currentPage || 0;
	console.log('pager match: ', match);

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
		<div className='btn-group'>
			<button onClick={() => gotoPage(0)} className='btn btn-info'>
				First
			</button>
			<button onClick={() => gotoPage(current - 2)} className='btn btn-info'>
				Prev
			</button>
			<span className='btn btn-primary'>{currentPage}</span>
			<button onClick={() => gotoPage(current)} className='btn btn-info'>
				Next
			</button>
			<button onClick={() => gotoPage(totalPages - 1)} className='btn btn-info'>
				Last
			</button>
		</div>
	);
};
