import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Nav = ({ location: { pathname } }) => {
	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Users', path: '/users' }
	];

	// TODO - NavLink activeClass not working properly. Home always showing active.

	return (
		<nav>
			<ul className='nav nav-tabs'>
				{navItems.map(navItem => {
					const { name, path } = navItem;
					return (
						<li key={name} className='nav-item'>
							<Link
								to={path}
								className={`nav-link${path === pathname ? ' active' : ''}`}
							>
								{name}
							</Link>
							<NavLink to={path} className='nav-link'>
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
