import React, { useContext } from 'react'

import { withRouter } from 'react-router-dom'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'
import ActionBar from './components/ActionBar'
import SignUpForm from './components/SignUpForm'

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

const SignUpPage = (props) => {
	return (
		<Layout>
			<Wrapper>
				<h1>Build Your Profile</h1>
				<SignUpForm />
			</Wrapper>
			{/* <ActionBar /> */}
		</Layout>
	)
}

export default withRouter(SignUpPage)
