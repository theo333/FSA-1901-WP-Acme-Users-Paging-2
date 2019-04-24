import React from 'react';

export const highlight = (strToSearch, searchTerm) => {
	const regex = new RegExp('(' + searchTerm + ')', 'gi');

	// curried ??
	return strToSearch.replace(regex, (str, matched, offset, input) => {
		return `<span class='highlight'>${matched}</span>`;
	});
};

export const displayHighlight = (strToSearch, searchTerm = '') => {
	if (searchTerm) {
		return (
			<div
				dangerouslySetInnerHTML={{
					__html: highlight(strToSearch, searchTerm)
				}}
			/>
		);
	}
	return strToSearch;
};
