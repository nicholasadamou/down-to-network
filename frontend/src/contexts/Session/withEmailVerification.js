import React from 'react'

import styled from 'styled-components'

import { Button } from 'carbon-components-react'

import AuthUserContext from './AuthUserContext'
import { withFirebase } from '../Firebase'

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

const needsEmailVerification = authUser =>
	authUser &&
	!authUser.emailVerified &&
	authUser.providerData
		.map(provider => provider.providerId)
		.includes('password')

const withEmailVerification = Component => {
	class WithEmailVerification extends React.Component {
		constructor(props) {
			super(props)

			this.state = { isSent: true }

			this.onSendEmailVerification = this.onSendEmailVerification.bind(this)
		}

		onSendEmailVerification = () => {
			this.props.firebase
				.doSendEmailVerification()
				.then(() => this.setState({ isSent: true }))
		}

		render() {
			return (
				<AuthUserContext.Consumer>
					{authUser =>
						needsEmailVerification(authUser) ? (
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

								{
									this.state.isSent ? (
										<Button
											kind="primary"
											onClick={this.onSendEmailVerification}
										>
											Resend Confirmation E-Mail
										</Button>
									) : (
										<Button
											kind="primary"
											onClick={this.onSendEmailVerification}
											disabled={this.state.isSent}
										>
											Send confirmation E-Mail
										</Button>
									)
								}
							</Wrapper>
						) : (
						<Component {...this.props} />
						)
					}
				</AuthUserContext.Consumer>
			)
		}
	}

	return withFirebase(WithEmailVerification)
}

export default withEmailVerification
