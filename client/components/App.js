import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Users from './Users';

export default () => {
	return (
		<Router>
			<Fragment>
				<header>
					<div id='site-heading'>Acme Users</div>
					<Route component={Nav} />
				</header>
				<section id='content'>
					<Route path='/' exact component={Home} />
					<Route path='/users/:usersIndex?' exact component={Users} />
					<Route
						path='/users/search/:term/:searchIndex?'
						exact
						component={Users}
					/>
				</section>
			</Fragment>
		</Router>
	);
};
