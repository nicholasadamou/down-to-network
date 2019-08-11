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

		// Get list of all users
		firebase.users().then(response => {
			// Filter current user out of users
			const users = response.filter(user => user.id !== user.uid)
			// const users = response
			console.log('users=', users)

			const target = firebase.getUserByRole(users, user.role)
			console.log('target=', target)
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
