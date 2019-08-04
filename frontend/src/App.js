import React from 'react'
import './App.scss'

import { BrowserRouter as Router } from 'react-router-dom'

import { withAuthentication } from './components/Session'

import AccountProvider from './contexts/Account/AccountProvider'
import Routes from './Routes'

const App = () => {
	return (
		<AccountProvider>
			<Router>
				<Routes />
			</Router>
		</AccountProvider>
	)
}


export default withAuthentication(App)
