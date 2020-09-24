import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../helpers/auth';
import { routes } from '../helpers/routes';

export default function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated('user') ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: routes.signin,
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}