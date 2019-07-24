import React from 'react'

import * as ROUTES from '../../constants/routes'

import styled from 'styled-components'

import { Button } from 'carbon-components-react'

import { getPageURL } from '../../utils/utils'

import Layout from '../../components/Layout/Layout'

import './index.scss'

import logo from '../../assets/logo.png'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	flex-wrap: wrap;

	height: 90vh;

	padding: 10px;

	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 75%;
	}
`

const LandingPage = (props) => {
	return (
		<Layout>
			<Wrapper>
				<img src={logo} />
				<Button
					kind="primary"
					type="button"
					size="field"
					className="LandingBtn"
					onClick={() => {
						window.location.href=`${getPageURL()}signin`
					}}
					style={{ marginBottom: '20px' }}
				>
					Sign In
				</Button>

				<Button
					kind="primary"
					type="button"
					size="field"
					className="LandingBtn"
					onClick={() => {
						window.location.href=`${getPageURL()}signup`
					}}
				>
					Sign Up
				</Button>
			</Wrapper>
		</Layout>
	)
}

export default LandingPage
