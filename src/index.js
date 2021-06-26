import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

// This is for routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => (
    <Router>
        <Switch>
            {/* Main page */}
            {/* exact prevents Switch from matching multiple components */}
            <Route exact path="/" component={App}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
