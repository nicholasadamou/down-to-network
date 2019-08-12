import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'

import { map } from 'lodash'

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
}

class Firebase {
	constructor() {
		app.initializeApp(config)

		this.app = firebase

		/* Helper */

		this.serverValue = app.database.ServerValue
		this.emailAuthProvider = app.auth.EmailAuthProvider

		/* Firebase APIs */

		this.auth = app.auth()
		this.database = app.database()
	}

	// *** Auth API ***

	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password)

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password)

	doSignOut = () => this.auth.signOut()

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

	doPasswordUpdate = password =>
		this.auth.currentUser.updatePassword(password)

	doSendEmailVerification = () =>
		this.auth.currentUser.sendEmailVerification({
			url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
		})

	// *** Merge Auth and DB User API *** //

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.getValue(`users/${authUser.uid}`).then(snapshot => {
					const dbUser = snapshot.val()

					// merge auth and db user
					authUser = {
						uid: authUser.uid,
						email: authUser.email,
						emailVerified: authUser.emailVerified,
						providerData: authUser.providerData,
						...dbUser,
					}

					next(authUser)
				})
			} else {
				fallback()
			}
		})

	// *** Query API ***

	mapSnapshotToEntity = snapshot => ({ id: snapshot.key, ...snapshot.val() })
	mapSnapshotToEntities = snapshot => map(snapshot.val(), (value, id) => ({ id, ...value }))

	ref = path => this.database.ref(path)
	getValue = path => this.ref(path).once('value')
	getEntity = path => this.getValue(path).then(this.mapSnapshotToEntity)
	getEntities = path => this.getValue(path).then(this.mapSnapshotToEntities)

	// *** User API ***

	user = uid => this.ref(`users/${uid}`)

	users = () => this.getEntities('users')

	// *** Match API ***

	getUsersByMatchSettings = (users, matchSettings) => {
		let matches = []

		users.forEach(user => {
			if (matchSettings.includes(user.role)) {
				matches.push(user)
			}
		})

		return matches
	}
}

export default Firebase
