/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

import * as ROUTES from '../../../constants/routes'

import Context from '../../../contexts/Context'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	height: 6vh;

	padding: 20px;

	background-color: #0061ff;

	a {
		text-decoration: none;

		color: white;

		&:hover {
			text-decoration: none;
		}
	}
`

const ActionBar = (props) => {
	const { handleSignUp } = useContext(Context)

	return (
		<Wrapper>
			<Link to={ROUTES.LANDING}>Back</Link>
			<a onClick={e => handleSignUp(e)}>Sign Up</a>
		</Wrapper>
	)
}

export default ActionBar
