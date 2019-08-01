import React from 'react'
import './App.scss'

import { BrowserRouter as Router } from 'react-router-dom'

import { withAuthentication } from './components/Session'

import Provider from './contexts/Provider'
import Routes from './Routes'

const App = () => {
	return (
		<Provider>
			<Router>
				<Routes />
			</Router>
		</Provider>
	)
}


export default withAuthentication(App)
