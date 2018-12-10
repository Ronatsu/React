import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Approutes from './Rutas/AppRutas';
import * as serviceWorker from './serviceWorker';
import BoundaryError from './ErrorBoundary';
import Dd from './Administrator/AdminTech';

render(
    <BoundaryError render={(error) => <p>guoooliiiii</p>}>
        <Router>
            <Approutes />
        </Router>
    </BoundaryError>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();