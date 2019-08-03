import React from 'react'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

// import EditAccountForm from './components/EditAccountForm'
import SignOutButton from './components/SignOutButton'

import './index.scss'

const Wrapper = styled.div`
	padding: 10px;
	margin-bottom: 120px;

	text-align: center;

	overflow-x: hidden;

	h1 {
		margin-bottom: 20px;

		font-size: larger;
		font-weight: bold;

		text-align: left;
	}
`

class AccountPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentWillMount() {}

	render() {
		return (
			<Layout>
				<Wrapper>
					<h1>Manage Your Profile</h1>
					<SignOutButton />
				</Wrapper>
				<MenuBar />
			</Layout>
		)
	}
}

export default AccountPage
