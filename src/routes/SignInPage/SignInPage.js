/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'
import ActionBar from './components/ActionBar'

import { TextInput } from 'carbon-components-react'

import Context from '../../contexts/Context'

const { PasswordInput } = TextInput

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	flex-wrap: wrap;

	position: absolute;
    bottom: 10%;
    left: 50%;
	transform: translateX(-50%);

	overflow: hidden;

    width: 100%;

	padding: 10px;

	div {
		margin-top: 10px;

		&:first-child {
			margin-top: 0;
		}
	}
`

const SignInPage = (props) => {
	const { setAccount } = useContext(Context)

	return (
		<Layout>
			<Wrapper>
				<TextInput
					id="email"
					labelText="Email"
					placeholder="Stephen.Alt@ibm.com"
					className="signin__btn"
					onBlur={(e) => setAccount(e)}
				/>
				<PasswordInput
					id="password1"
					labelText="Password"
					defaultValue="password1234!%"
					className="signin__btn"
					onBlur={(e) => setAccount(e)}
				/>
			</Wrapper>
			<ActionBar />
		</Layout>
	)
}

export default SignInPage
