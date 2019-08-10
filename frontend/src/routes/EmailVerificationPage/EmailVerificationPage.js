import React, { Component } from 'react'

import styled from 'styled-components'

import { Redirect } from 'react-router-dom'

import { Button } from 'carbon-components-react'

import * as ROUTES from '../../constants/routes'

import { withFirebase } from '../../contexts/Firebase';
import AccountContext from '../../contexts/Account/AccountContext';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	width: 100%;
	height: 100%;

	padding: 20px;

	overflow: hidden;

	@media (max-width: 375px) {
		align-items: flex-start;
		justify-content: flex-end;
	}

	strong {
		font-size: xx-large;
		line-height: 2;
		font-weight: bold;
	}

	p, em {
		font-size: x-large;
		line-height: 2;
	}

	em {
		font-style: italic;
	}

	button {
		margin-top: 20px;

		width: 18rem;

		font-size: large;

		@media (max-width: 375px) {
			width: 100%;
			max-width: 100%;
		}
	}
`

const needsEmailVerification = authUser => {
	return authUser && !authUser.emailVerified
}

class EmailVerificationPage extends Component {
	static contextType = AccountContext

	constructor(props) {
		super(props)

		this.state = {
			isSent: true,
			isAuthenticated: false
		}

		this.onSendEmailVerification = this.onSendEmailVerification.bind(this)
	}

	onSendEmailVerification = () => {
		this.props.firebase
		.doSendEmailVerification()
		.then(() => this.setState({ isSent: true }))
	}

	componentDidMount() {
		const { firebase } = this.props

        firebase.auth.onAuthStateChanged(authUser => {
            if (!needsEmailVerification(authUser)) {
				this.setState({
					isAuthenticated: true
				})
			}
		})
	}

	render() {
		const { isAuthenticated } = this.state

		if (isAuthenticated) return (
			<Redirect to={ROUTES.ACCOUNT} />
		)

		return (
			<Wrapper>
				{this.state.isSent ? (
					<>
						<strong>
							E-Mail confirmation sent! <span role="img" aria-label="checkmark">✅</span>
						</strong>
						<p>
							Check your E-Mail (Spam folder included) for a confirmation E-Mail.
						</p>
						<em>
							Refresh this page once you confirmed your E-Mail.
						</em>
					</>
				) : (
					<>
						<strong>
							Verify your E-Mail. <span role="img" aria-label="warning">⚠️</span>
						</strong>
						<p>
							Check your E-Mail (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.
						</p>
					</>
				)}

				<Button
					kind="primary"
					onClick={this.onSendEmailVerification}
					disabled={this.state.isSent}
				>
					Send confirmation E-Mail
				</Button>
			</Wrapper>
		)
	}
}

export default withFirebase(EmailVerificationPage)
