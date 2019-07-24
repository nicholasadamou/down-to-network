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

	position: fixed;
	bottom: 0;

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
	const { handleLogin } = useContext(Context)

	return (
		<Wrapper>
			<Link to={ROUTES.LANDING}>Back</Link>
			<a onClick={e => handleLogin(e)}>Sign In</a>
		</Wrapper>
	)
}

export default ActionBar
