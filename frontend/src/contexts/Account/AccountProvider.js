import React, { Component } from 'react'

import AccountContext from './AccountContext'

import * as ROUTES from '../../constants/routes'

import { withFirebase } from '../../components/Firebase'

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
	passwordOne: '',
	passwordTwo: '',
	avatar: '',
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
		this.handleChangeProfilePicture = this.handleChangeProfilePicture.bind(this)
		this.handlePasswordReset = this.handlePasswordReset.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		
		this.setPassword = this.setPassword.bind(this)
		this.setAvatar = this.setAvatar.bind(this)
		this.removeAvatar = this.removeAvatar.bind(this)
		this.setAccount = this.setAccount.bind(this)
		this.removeAccountAttributeByKey = this.removeAccountAttributeByKey.bind(this)

		this.isAccountValid = this.isAccountValid.bind(this)
		this.validateEmail = this.validateEmail.bind(this)
		this.validatePassword = this.validatePassword.bind(this)
	}

	removeAccountAttributeByKey = (target) => {
		const { account } = this.state

		delete account[`${target}`]

		this.setState({
			account
		}, () => console.log('AccountProvider.account=', this.state.account))
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

			// Redirect to landing page
			window.location.href = `${ROUTES.LANDING}`
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

						// Redirect to landing page
						window.location.href = `${ROUTES.LANDING}`
					})
					.catch(error => {
						this.setState({
							error
						}, () => console.log('error=', error))
					})
			}
		}
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
						account: dbUser
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
					handleChangeProfilePicture: this.handleChangeProfilePicture,
					handlePasswordReset: this.handlePasswordReset,
					handlePasswordChange: this.handlePasswordChange,
					setPassword: this.setPassword,
					setAvatar: this.setAvatar,
					removeAvatar: this.removeAvatar,
					setAccount: this.setAccount,
					removeAccountAttributeByKey: this.removeAccountAttributeByKey,
					validateEmail: this.validateEmail,
					validatePassword: this.validatePassword
				}}
			>
				{ children }
			</AccountContext.Provider>
		)
	}
}

export default withFirebase(AccountProvider)
