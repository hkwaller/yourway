import {render} from 'react-dom';
import React from 'react';
import App from './components/App';
import Finished from './components/Finished';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';



render(<Router history={browserHistory}>
		<Route path="/" component={App} />
		<Route path="/finished" component={Finished} />
	</Router>, document.getElementById('root'));
