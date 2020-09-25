import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom';
import './sass/style.scss';

import PrivateRoute from './routes/privateroute';
import NotFound from './routes/notfound';
import Signin from './routes/signin';
import Signup from './routes/signup';
import Signout from './routes/signout';
import NewList from './routes/newlist';
import Main from './routes/main';

import Container from './components/modular/container';
import Navbar from './components/modular/navbar';

import { routes } from './helpers/routes';

function App() {
	return (
		<Container>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<PrivateRoute exact path={routes.main}>
						<Main />
					</PrivateRoute>

					<PrivateRoute exact path={routes.signout}>
						<Signout />
					</PrivateRoute>

					<PrivateRoute exact path={routes.new}>
						<NewList />
					</PrivateRoute>

					<Route path={routes.signin}>
						<Signin />
					</Route>
					<Route path={routes.signup}>
						<Signup />
					</Route>

					<Route path='*'>
						<NotFound />
					</Route>
				</Switch>
			</BrowserRouter>
		</Container>
	);
}

export default App;
