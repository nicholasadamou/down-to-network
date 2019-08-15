/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import { compose } from 'recompose'

// import styled from 'styled-components'

import { withAuthorization, withEmailVerification } from '../../contexts/Session'

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'
import AccountContext from '../../contexts/Account/AccountContext';

class DashboardPage extends Component {
	static contextType = AccountContext

	constructor (props) {
		super(props)

		this.state = {}
	}

	componentWillMount () {
		const { firebase } = this.props
		const { user } = this.context
		console.log('user=', user)

		// Get list of all users
		firebase.users().then(response => {
			// Filter current user out of users
			const users = response.filter(user => user.id !== this.context.user.uid)
			console.log('users=', users)

			// TODO: Filter previously matched users out of users

			// Get list of users whose role matches the
			// currently authenticated user's list of
			// networking preferences
			const matches = firebase.getUsersByMatchSettings(users, user.matchSettings)
			console.log('matches=', matches)
		})
	}

	render () {
		return (
			<Layout>
				<MenuBar />
			</Layout>
		)
	}
}

export default compose(
	withEmailVerification,
	withAuthorization(authUser => !!authUser)
)(DashboardPage)
