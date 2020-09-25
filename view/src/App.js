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
import Main from './routes/main';

import Container from './components/container';
import Navbar from './components/navbar';

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
