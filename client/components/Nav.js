import React from 'react';
import { NavLink } from 'react-router-dom';
import Home from './Home';

const Nav = () => {
	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Users', path: '/users' }
	];

	// TODO - activeClass not working properly. Home always showing active.

	return (
		<nav>
			<ul className='nav nav-tabs'>
				{navItems.map(navItem => {
					const { name, path } = navItem;
					return (
						<li key={name} className='nav-item'>
							<NavLink to={path} className='nav-link' activeClassName='active'>
								{name}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Nav;
