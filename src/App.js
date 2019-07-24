import React from 'react';
import './App.scss';

import { BrowserRouter as Router } from 'react-router-dom'

import Provider from './contexts/Provider'
import Routes from './Routes'

import Firebase, {withFirebase, FirebaseContext } from './components/Firebase';

import { withAuthentication } from './components/Session';

const App = () => {
	return (
		<FirebaseContext.Provider value={new Firebase()}>
			<Provider>
				<Router>
					<Routes />
				</Router>
			</Provider>
		</FirebaseContext.Provider>
	)
}


export default withFirebase(App);
