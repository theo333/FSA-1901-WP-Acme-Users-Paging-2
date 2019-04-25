import React from 'react';

import { displayHighlight } from './Highlight';

const UsersTable = ({ users, term }) => {
	const tableHeaders = [
		'First Name',
		'Last Name',
		'Middle Name',
		'Email',
		'Title'
	];
	return (
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
					const { id, firstName, lastName, middleName, email, title } = user;

					const userFields = [firstName, lastName, middleName, email, title];
					return (
						<tr key={id}>
							{userFields.map((field, idx) => {
								return <td key={idx}>{displayHighlight(field, term)}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UsersTable;
