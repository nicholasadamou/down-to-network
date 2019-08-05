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

const INITIAL_STATE = {
	user: {},
	account: {},
	loading: true,
	error: ''
}

class AccountProvider extends Component {
	constructor(props) {
		super(props)

		this.state = { ...INITIAL_STATE }

		this.handleLogin = this.handleLogin.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
		this.handleSignOut = this.handleSignOut.bind(this)
		this.handleCloseAccount = this.handleCloseAccount.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordReset = this.handlePasswordReset.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleChangeProfilePicture = this.handleChangeProfilePicture.bind(this)
		this.handleChangeRole = this.handleChangeRole.bind(this)
		this.handleChangeMatchSettings = this.handleChangeMatchSettings.bind(this)
		
		this.setAccount = this.setAccount.bind(this)
		this.removeAccountAttributeByKey = this.removeAccountAttributeByKey.bind(this)

		this.isAccountValid = this.isAccountValid.bind(this)
		this.validateEmail = this.validateEmail.bind(this)
		this.validatePassword = this.validatePassword.bind(this)
		this.doesUserExist = this.doesUserExist.bind(this)
		this.reauthenticate = this.reauthenticate.bind(this)
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
				error
			}, () => console.log('error=', error))
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
				error
			}, () => console.log('error=', error))
		})


		console.log('AccountProvider.handleSignUp=', account)
	}

	handleEmailChange = (e, email, password) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.state

		// Reauthenticate user before proceeding
		this.reauthenticate(password)
			.then(() => {
				user
					.updateEmail(email)
					.then(() => {
						return firebase.doSendEmailVerification()
					})
					.then(() => {
						// Update account email
						account.email = email

						// Redirect to account page
						window.location.href = `${ROUTES.ACCOUNT}`
					})
					.catch(error => {
						this.setState({
							error
						}, () => console.log('error=', error))
					})
			}).catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handlePasswordReset = e => {
		e.preventDefault()

		const { firebase } = this.props
		const { account } = this.state

		firebase.doPasswordReset(account.email).catch(error => {
			this.setState({
				error
			}, () => console.log('error=', error))
		})

		window.location.href = `${ROUTES.LANDING}`
	}

	handlePasswordChange = (e, newPassword, currentPassword) => {
		e.preventDefault()

		const { firebase } = this.props
		const { account } = this.state

		// Reauthenticate user before proceeding
		this.reauthenticate(currentPassword)
			.then(() => {
				firebase
					.doPasswordUpdate(newPassword)
					.then(() => {
						// Update account password
						account.password = newPassword

						// Redirect to account page
						window.location.href = `${ROUTES.ACCOUNT}`				
					})
					.catch(error => {
						this.setState({
							error
						}, () => console.log('error=', error))
					})
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleChangeProfilePicture = (e, profilePicture) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.state

		firebase
			.ref(`users/${user.uid}`).child(user.uid).update({
				profilePicture
			})
			.then(() => {
				// Update account profilePicture
				account.profilePicture = profilePicture

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleChangeRole = (e, role) => {
		e.preventDefault()
		
		const { firebase } = this.props
		const { user, account } = this.state

		firebase
			.ref(`users/${user.uid}`).child(user.uid).update({
				role
			})
			.then(() => {
				// Update account role
				account.role = role

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleChangeMatchSettings = (e, matchSettings) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.state

		firebase
			.ref(`users/${user.uid}`).child(user.uid).update({
				matchSettings
			})
			.then(() => {
				// Update account match-settings
				account.matchSettings = matchSettings

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleSignOut = e => {
		e.preventDefault()

		const { firebase } = this.props

		if (this.doesUserExist()) {
			// Sign out
			firebase.doSignOut()

			// Remove auth token
			localStorage.removeItem('authUser')

			// Reset state
			this.setState({
				...INITIAL_STATE
			}, () => console.log('state=', this.state))

			// Redirect to landing page
			window.location.href = `${ROUTES.LANDING}`
		}
	}

	handleCloseAccount = (e, password) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user } = this.state

		if (window.confirm('Are you sure you want to close your account? This cannot be undone!')) {
			if (this.doesUserExist()) {
				// Reauthenticate user before proceeding
				this.reauthenticate(password).then(() => {
					// Remove user from auth system
					user
					.delete()
					.then(() => {
						// Remove user from real time database
						firebase.ref(`users/${user.uid}`).remove()

						// Remove auth token
						localStorage.removeItem('authUser')

						// Reset state
						this.setState({
							...INITIAL_STATE
						}, () => console.log('state=', this.state))

						// Redirect to landing page
						window.location.href = `${ROUTES.LANDING}`
					})
					.catch(error => {
						this.setState({
							error
						}, () => console.log('error=', error))
					})
				})
			}
		}
	}

	doesUserExist = () => {
		return this.state.user !== undefined && localStorage.getItem('authUser') !== undefined
	}

	reauthenticate = password => {
		const { firebase } = this.props
		const { user } = this.state

		const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)
		
		return user.reauthenticateAndRetrieveDataWithCredential(credential)
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
					handleCloseAccount: this.handleCloseAccount,
					handleEmailChange: this.handleEmailChange,
					handlePasswordReset: this.handlePasswordReset,
					handlePasswordChange: this.handlePasswordChange,
					handleChangeProfilePicture: this.handleChangeProfilePicture,
					handleChangeRole: this.handleChangeRole,
					handleChangeMatchSettings: this.handleChangeMatchSettings,
					setAccount: this.setAccount,
					removeAccountAttributeByKey: this.removeAccountAttributeByKey,
					validateEmail: this.validateEmail,
					validatePassword: this.validatePassword,
					doesUserExist: this.doesUserExist,
				}}
			>
				{ children }
			</AccountContext.Provider>
		)
	}
}

export default withFirebase(AccountProvider)
