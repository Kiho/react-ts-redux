import * as React from 'react';
import * as ReactDOM from 'react-dom';
import objectAssign = require('object-assign');
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configure-store';

// Global styles
// import './styles/index.css';

const store = configureStore({});
const history = syncHistoryWithStore(hashHistory, store);

if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = objectAssign;
    })();
}

function renderApp() {
    const container = document.getElementById('app');
    ReactDOM.render(
        <div>
            <Provider store={ store }>
                <Router history={ history }>
                    { routes() }
                </Router>
            </Provider>
        </div>,
        container);
}

// Render HTML on the browser
(function () {
    renderApp();
})();

