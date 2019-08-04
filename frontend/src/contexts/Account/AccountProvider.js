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

const INITIAL_ACCOUNT = {
	email: '',
	passwordOne: '',
	passwordTwo: '',
	avatar: '',
	role: '',
	matchSettings: []
}

const INITIAL_STATE = {
	user: {},
	account: {},
	...INITIAL_ACCOUNT,
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
		
		this.setEmail = this.setEmail.bind(this)
		this.setPassword = this.setPassword.bind(this)
		this.setAvatar = this.setAvatar.bind(this)
		this.removeAvatar = this.removeAvatar.bind(this)
		this.setRole = this.setRole.bind(this)
		this.setMatchSettings = this.setMatchSettings.bind(this)
		this.setAccount = this.setAccount.bind(this)
		this.removeAccountAttributeByKey = this.removeAccountAttributeByKey.bind(this)

		this.isAccountValid = this.isAccountValid.bind(this)
		this.validateEmail = this.validateEmail.bind(this)
		this.validatePassword = this.validatePassword.bind(this)
		this.doesUserExist = this.doesUserExist.bind(this)
	}

	removeAccountAttributeByKey = (target) => {
		const { account } = this.state

		delete account[`${target}`]

		this.setState({
			account
		}, () => console.log('AccountProvider.account=', this.state.account))
	}

	setEmail = email => {
		this.setState({
				email
		}, () => console.log('email=', this.state.email))
	}

	setPassword = (id, password) => {
		if (id === 'passwordOne') {
			this.setState({
				passwordOne: password
			}, () => console.log('passwordOne=', this.state.passwordOne))
		} else if (id === 'passwordTwo') {
			this.setState({
				passwordTwo: password
			}, () => console.log('passwordTwo=', this.state.passwordTwo))
		}
	}

	setAvatar = file => {
		let reader = new FileReader()

		if (file) {
			reader.readAsDataURL(file)
		}

		reader.addEventListener("load", () => {
			this.setState({
				avatar: reader.result
			}, () => console.log('avatar=', this.state.avatar))
		}, false)
	}

	removeAvatar = () => {
		this.setState({
			avatar: ''
		})
	}

	setRole = role => {
		this.setState({
			role
		}, () => console.log('role=', this.state.role))
	}

	setMatchSettings = matchSettings => {
		this.setState({
			matchSettings
		}, () => console.log('matchSettings=', this.state.matchSettings))
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
		} else if (cell.id === 'avatar') {
			let reader = new FileReader()
			let file = cell.value

			if (file) {
				reader.readAsDataURL(file)
			}

			reader.addEventListener("load", () => {
				account.avatar = reader.result
			}, false)
		} else if (cell.id === 'first-name') {
			account.firstName = cell.value
		} else if (cell.id === 'last-name') {
			account.lastName = cell.value
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
				&& account.avatar !== '' 
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
	
		const { account } = this.state
		const { firebase } = this.props

		const { avatar, email, firstName, lastName, role, matchSettings } = account

		firebase.doCreateUserWithEmailAndPassword(account.email, account.password).then(authUser => {
			// Create a user in your Firebase real time database
			return firebase.user(`${authUser.user.uid}`).set({
				name: `${firstName} ${lastName}`,
				firstName,
				lastName,
				avatar,
				email,
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

	handleEmailChange = (e, email) => {
		e.preventDefault()

		const { user, account } = this.state
		const { firebase } = this.props

		user
			.updateEmail(email)
			.then(() => {
				return firebase.doSendEmailVerification()
			})
			.then(() => {
				// Update account email
				account.email = email

				// Reset state
				this.setState({ 
					email: '',
					error: null
				})

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
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

	handlePasswordChange = e => {
		e.preventDefault()

		const { firebase } = this.props
		const { account, passwordOne } = this.state

		firebase
			.doPasswordUpdate(passwordOne)
			.then(() => {
				// Update account password
				account.password = passwordOne

				// Reset state
				this.setState({ 
					passwordOne: '',
					passwordTwo: '',
					error: null
				})

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`				
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleChangeProfilePicture = e => {
		e.preventDefault()

		const { user, account, avatar } = this.state
		const { firebase } = this.props

		firebase
			.ref(`users/${user.uid}`).child(user.uid).update({
				avatar
			})
			.then(() => {
				// Update account avatar
				account.avatar = avatar

				// Reset state
				this.setState({
					avatar: null,
					error: null
				})

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleChangeRole = e => {
		e.preventDefault()

		const { user, account, role } = this.state
		const { firebase } = this.props

		firebase
			.ref(`users/${user.uid}`).child(user.uid).update({
				role
			})
			.then(() => {
				// Update account role
				account.role = role

				// Reset state
				this.setState({
					role: null,
					error: null
				})

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
				this.setState({
					error
				}, () => console.log('error=', error))
			})
	}

	handleChangeMatchSettings = e => {
		e.preventDefault()

		const { user, account, matchSettings } = this.state
		const { firebase } = this.props

		firebase
			.ref(`users/${user.uid}`).child(user.uid).update({
				matchSettings
			})
			.then(() => {
				// Update account match-settings
				account.matchSettings = matchSettings

				// Reset state
				this.setState({
					matchSettings: null,
					error: null
				})

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

		if (localStorage.getItem('authUser') !== undefined) {
			// Sign out
			firebase.doSignOut()

			// Remove auth token
			localStorage.removeItem('authUser')

			// Reset state
			this.setState({
				...INITIAL_STATE
			}, () => console.log('state=', this.state))

			// Redirect to Sign In page
			window.location.href = `${ROUTES.SIGN_IN}`
		}
	}

	handleCloseAccount = e => {
		e.preventDefault()

		const { firebase } = this.props
		const { user } = this.state

		if (window.confirm('Are you sure you want to close your account? This cannot be undone!')) {
			if (localStorage.getItem('authUser') !== undefined) {
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

						// Redirect to Sign In page
						window.location.href = `${ROUTES.SIGN_IN}`
					})
					.catch(error => {
						this.setState({
							error
						}, () => console.log('error=', error))
					})
			}
		}
	}

	doesUserExist = () => {
		return this.state.user && localStorage.getItem('authUser')
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
						account: dbUser,
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
					setEmail: this.setEmail,
					setPassword: this.setPassword,
					setAvatar: this.setAvatar,
					removeAvatar: this.removeAvatar,
					setRole: this.setRole,
					setMatchSettings: this.setMatchSettings,
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
