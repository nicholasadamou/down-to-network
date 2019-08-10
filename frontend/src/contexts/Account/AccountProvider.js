import React, { Component } from 'react'

import AccountContext from './AccountContext'

import * as ROUTES from '../../constants/routes'

import { withFirebase } from '../../contexts/Firebase'

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with this E-Mail address already exists.
	Try to login with this account instead. If you think the
	account is already used from one of the social logins, try
	to sign in with one of them. Afterward, associate your accounts
	on your personal account page.
`

const INITIAL_ERROR_STATE = {
    error: false,
    message: ''
}

const INITIAL_STATE = {
	user: {},
	account: {},
	loading: true,
	error: {
		...INITIAL_ERROR_STATE
	}
}

class AccountProvider extends Component {
	constructor(props) {
		super(props)

		this.state = { ...INITIAL_STATE }

		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
		this.handleSignOut = this.handleSignOut.bind(this)
		this.handlePasswordReset = this.handlePasswordReset.bind(this)

		this.setAccount = this.setAccount.bind(this)
		this.removeAccountAttributeByKey = this.removeAccountAttributeByKey.bind(this)

		this.isAccountValid = this.isAccountValid.bind(this)
		this.validateEmail = this.validateEmail.bind(this)
		this.validatePassword = this.validatePassword.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)
		this.reauthenticate = this.reauthenticate.bind(this)
		this.reset = this.reset.bind(this)
	}

	reset = () => {
		this.setState({
			...INITIAL_STATE
		}, () => console.log('state=', this.state))
	}

	removeAccountAttributeByKey = (target) => {
		const { account } = this.state

		delete account[`${target}`]

		this.setState({
			account
		}, () => console.log('AccountProvider.account=', this.state.account))
	}

	setAccount = (id, e) => {
		const { account } = this.state

		let cell = null

		if (e.target !== undefined) {
			cell = {
				value: e.target.value,
				id
			}
		} else {
			cell = {
				value: e,
				id
			}
		}

		if (cell.id === 'email') {
			account.email = cell.value
		} else if (cell.id === 'password') {
			account.password = cell.value
		} else if (cell.id === 'profilePicture') {
			let reader = new FileReader()
			let file = cell.value

			if (file) {
				reader.readAsDataURL(file)
			}

			reader.addEventListener("load", () => {
				account.profilePicture = reader.result
			}, false)
		} else if (cell.id === 'name') {
			account.name = cell.value
		} else if (cell.id === 'role') {
			account.role = cell.value
		} else if (cell.id === 'match-settings') {
			account.matchSettings = cell.value.map(setting => setting.id)
		}

		this.setState({
			account,
		}, () => console.log('AccountProvider.account=', this.state.account))
	}

	isAccountValid = account => {
		return account.email !== ''
				&& account.password !== ''
				&& account.profilePicture !== ''
				&& account.firstName !== ''
				&& account.lastName !== ''
				&& account.role !== ''
				&& account.matchSettings !== undefined
	}

	validateEmail = email => {
		let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regex.test(email)
	}

	validatePassword = password => {
		let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
		return regex.test(password)
	}

	handleLogin = e => {
		e.preventDefault()

		const { account } = this.state
		const { firebase } = this.props

		firebase.doSignInWithEmailAndPassword(account.email, account.password).then(() => {
			window.location.href = `${ROUTES.DASHBOARD}`
		}).catch(error => {
			this.setState({
				error: {
					error: true,
					message: error.message
				}
			}, () => console.log('error=', this.state.error))
		})

		console.log('AccountProvider.handleLogin=', account)
	}

	handleSignUp = e => {
		e.preventDefault()

		const { firebase } = this.props
		const { account } = this.state

		const { profilePicture, name, role, matchSettings } = account

		firebase.doCreateUserWithEmailAndPassword(account.email, account.password).then(authUser => {
			// Create a user in your Firebase real time database
			return firebase.user(`${authUser.user.uid}`).set({
				name,
				profilePicture,
				role,
				matchSettings
			})
		})
		.then(() => {
			return firebase.doSendEmailVerification()
		})
		.then(() => {
			window.location.href = `${ROUTES.DASHBOARD}`
		})
		.catch(error => {
			if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
				error.message = ERROR_MSG_ACCOUNT_EXISTS
			}

			this.setState({
				error: {
					error: true,
					message: error.message
				}
			}, () => console.log('error=', this.state.error))
		})


		console.log('AccountProvider.handleSignUp=', account)
	}

	handlePasswordReset = e => {
		e.preventDefault()

		const { firebase } = this.props
		const { account } = this.state

		firebase.doPasswordReset(account.email).catch(error => {
			this.setState({
				error: {
					error: true,
					message: error.message
				}
			}, () => console.log('error=', this.state.error))
		})

		window.location.href = `${ROUTES.LANDING}`
	}

	handleSignOut = e => {
		e.preventDefault()

		const { firebase } = this.props

		if (this.isAuthenticated()) {
			// Sign out
			firebase.doSignOut()

			// Remove auth token
			localStorage.removeItem('authUser')

			// Reset state
			this.reset()

			// Redirect to landing page
			window.location.href = `${ROUTES.LANDING}`
		}
	}

	isAuthenticated = () => {
		return this.state.user !== undefined &&
			localStorage.getItem('authUser') !== undefined &&
			localStorage.getItem('authUser') !== null
	}

	reauthenticate = password => {
		const { firebase } = this.props
		const { user } = this.state

		const credential = firebase.app.auth.EmailAuthProvider.credential(user.email, password)

		return user.reauthenticateWithCredential(credential)
	}

	componentDidMount() {
		const { firebase } = this.props

        firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
				this.setState({
					user: authUser
				}, () => console.log('user=', this.state.user))

                firebase.getValue(`users/${authUser.uid}`).then(snapshot => {
					const dbUser = snapshot.val()

					this.setState({
						account: {...dbUser},
						loading: false,
					}, () => console.log('account=', this.state.account))
				})
            }
        })
	}

	render() {
		const { children } = this.props

		return (
			<AccountContext.Provider value={{
					...this.state,
					handleLogin: this.handleLogin,
					handleSignUp: this.handleSignUp,
					handleSignOut: this.handleSignOut,
					handlePasswordReset: this.handlePasswordReset,
					setAccount: this.setAccount,
					removeAccountAttributeByKey: this.removeAccountAttributeByKey,
					validateEmail: this.validateEmail,
					validatePassword: this.validatePassword,
					isAuthenticated: this.isAuthenticated,
					reauthenticate: this.reauthenticate,
					reset: this.reset
				}}
			>
				{ children }
			</AccountContext.Provider>
		)
	}
}

export default withFirebase(AccountProvider)
