import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
import About from './routes/about';
import Main from './routes/main';

import Container from './components/modular/container';
import Navbar from './components/modular/navbar';
import Toast from './components/modular/toast';

import { routes } from './helpers/routes';
import * as toast from './actions/toastactions';

function App({ tText, tStatus, toastStatus }) {
	useEffect(() => {
		setTimeout(() => toastStatus(''), 3500);
	}, [tStatus, toastStatus]);

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

					<PrivateRoute path={routes.edit}>
						<NewList />
					</PrivateRoute>

					<Route path={routes.signin}>
						<Signin />
					</Route>
					<Route path={routes.signup}>
						<Signup />
					</Route>

					<Route exact path={routes.about}>
						<About />
					</Route>

					<Route path='*'>
						<NotFound />
					</Route>
				</Switch>
			</BrowserRouter>

			<Toast status={tStatus} text={tText} />
		</Container>
	);
}

const mapStateToProps = state => ({
	tStatus: state.toast.status,
	tText: state.toast.text
});

const mapDispatchToProps = dispatch => ({
	toastStatus: status => dispatch(toast.toastStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
