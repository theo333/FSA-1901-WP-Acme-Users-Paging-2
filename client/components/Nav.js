import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location: { pathname } }) => {
	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Users', path: '/users' }
	];

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
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Nav;
