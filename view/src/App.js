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

import Container from './components/container';
import Navbar from './components/navbar';

function App() {
	return (
		<Container>
			<BrowserRouter>
				<Navbar />
				<Switch>
					<PrivateRoute exact path='/'>
						<div>Menu Entrada</div>
					</PrivateRoute>

					<Route path='/signin'>
						<Signin />
					</Route>
					<Route path='/signup'>
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
