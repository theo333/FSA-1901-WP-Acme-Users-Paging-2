import React, { Component } from 'react';

// TODO - change to class because have a class method - gotoPage

export default ({ currentPage, totalPages, history, match }) => {
	const current = Number(match.params.usersIndex) || 0;

	const gotoPage = id => {
		// console.log('id: ', id);
		// console.log('current: ', current);
		return history.push(`/users/${id}`);
	};
	return (
		<div className='btn-group'>
			<button onClick={() => gotoPage(0)} className='btn btn-info'>
				First
			</button>
			<button onClick={() => gotoPage(current - 1)} className='btn btn-info'>
				Prev
			</button>
			<span className='btn btn-primary'>{currentPage}</span>
			<button onClick={() => gotoPage(current + 1)} className='btn btn-info'>
				Next
			</button>
			<button onClick={() => gotoPage(totalPages - 1)} className='btn btn-info'>
				Last
			</button>
		</div>
	);
};
