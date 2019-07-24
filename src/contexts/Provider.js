import React, { Component } from 'react'

import GlobalContext from './Context'

import functions from '../functions/functions'

import * as ROUTES from '../constants/routes'

import { withFirebase } from '../components/Firebase';

class Provider extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			selected: [],
			account: {},
			error: ''
		}

		this.addSelection = this.addSelection.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
		this.setAccount = this.setAccount.bind(this)
		this.isAccountValid = this.isAccountValid.bind(this)
	}

	addSelection = selected => {
		this.setState({
			selected,
		}, () => console.log('Provider.selected=', this.state.selected))
	}

	isAccountValid = account => {
		return account.email !== '' && (account.password1 === account.password2) && account.name !== '' && account.location !== '' && account.bio !== '' && account.role !== '' && account.education !== '' && account.past_exp !== '' && account.fun_facts !== ''
	}

	setAccount = e => {
		const { account } = this.state

		const cell = {
			target: e.target,
			value: e.target.value,
			id: e.target.id
		}

		if (cell.id === 'email') {
			account.email = cell.value
		} else if (cell.id === 'password1') {
			account.password1 = cell.value
		} else if (cell.id === 'password2') {
			account.password2 = cell.value
		} else if (cell.id === 'location') {
			account.location = cell.value
		} else if (cell.id === 'bio') {
			account.bio = cell.value
		} else if (cell.id === 'name') {
			account.name = cell.value
		} else if (cell.id === 'role') {
			account.role = cell.value
		} else if (cell.id === 'education') {
			account.education = cell.value
		} else if (cell.id === 'past_exp') {
			account.past_exp = cell.value
		} else if (cell.id === 'fun_facts') {
			account.fun_facts = cell.value
		}

		this.setState({
			account,
		}, () => console.log('Provider.account=', this.state.account))

		console.log(account)
	}

	handleLogin = e => {
		const { account } = this.state
		const { firebase } = this.props

		firebase.doSignInWithEmailAndPassword(account.email, account.password1).then(authUser => {
			window.location.href = ROUTES.HOME
		}).catch(error => {
			this.setState({ error });
		});

		console.log('Provider.handleLogin=', account)
	}

	handleSignUp = e => {
		e.preventDefault();

		const { account } = this.state
		const { firebase } = this.props

		if (!this.isAccountValid(account)) return
		else {
			firebase.doCreateUserWithEmailAndPassword(account.email, account.password1).then(authUser => {
				console.log(authUser)

				firebase.database().ref(`users/${authUser.uid}`).set({...account})

				window.location.href = ROUTES.HOME;
			}).catch(error => {
				this.setState({ error });
			});
		}

		console.log('Provider.handleSignUp=', account)
	}

	componentDidMount() {}

	render() {
		const { children } = this.props

		return (
			<GlobalContext.Provider value={{
					...this.state,
					addSelection: this.addSelection,
					handleLogin: this.handleLogin,
					setAccount: this.setAccount,
					handleSignUp: this.handleSignUp
				}}
			>
				{ children }
			</GlobalContext.Provider>
		)
	}
}

export default withFirebase(Provider)
