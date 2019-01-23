import React from 'react';  
import { Redirect, Route } from 'react-router-dom';

// Utils

function PrivateRoute({ component: Component, authed, ...rest }) {
    console.log(authed);
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;