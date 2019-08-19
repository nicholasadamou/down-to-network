import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import * as ROUTES from '../../../../constants/routes'

import AccountContext from '../../../../contexts/Account/AccountContext'
import { withFirebase } from '../../../../contexts/Firebase';

const { PasswordInput } = TextInput

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;

	padding: 10px;

    overflow-x: hidden;

	h1 {
		margin-bottom: 20px;

		font-size: larger;
		font-weight: bold;
	}

    p {
        line-height: 2;
    }

    .bx--form {
        width: 100%;

        button {
            width: 100%;
            max-width: 100%;
        }

        .bx--text-input--password__visibility {
            width: initial;
        }
	}

	.bx--form-requirement {
		text-align: left;
	}
`

const INITIAL_ERROR_STATE = {
    error: false,
    message: ''
}

class ChangeEmailForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            email: '',
            error: {
                ...INITIAL_ERROR_STATE
			},
			emailInvalid: false,
			emailInvalidText: ''
        }

		this.handleChange = this.handleChange.bind(this)
		this.validateCurrentPassword = this.validateCurrentPassword.bind(this)
		this.validateEmail = this.validateEmail.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    handleChange = e => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
	}

	validateCurrentPassword = e => {
		const currentPassword = e.target.value

		if (currentPassword === '') {
			this.setState({
				error: {
					error: true,
					message: 'Current Password field must not be empty.'
				}
			})
		} else {
			this.setState({
				error: {
					...INITIAL_ERROR_STATE
				}
			})
		}
	}

	validateEmail = e => {
		const { validateEmail } = this.context

		const email = e.target.value

		if (!validateEmail(email)) {
			this.setState({
				emailInvalid: true,
				emailInvalidText: 'The email address that was entered is invaild.'
			})

			if (this.state.password === '') {
				this.setState({
					error: {
						error: true,
						message: 'Current Password field must not be empty.'
					}
				})
			}
		} else {
			if (this.state.password === '') {
				this.setState({
					error: {
						error: true,
						message: 'Current Password field must not be empty.'
					}
				})
			}

			this.setState({
				emailInvalid: false,
				emailInvalidText: ''
			})
		}
	}

    handleEmailChange = (e, email, password) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account, reauthenticate } = this.context

		// Re-authenticate user before proceeding
		reauthenticate(password)
			.then(() => {
				user
					.updateEmail(email)
					.then(() => {
						// Update the user's email in the real time database
						return firebase.user(`${user.uid}`).update({
							email
						})
					})
					.then(() => {
						// Send a email verification in order to
						// verify the user's new email address
						return firebase.doSendEmailVerification()
					})
					.then(() => {
						// Update account email
						account.email = email

						// Redirect to account page
						window.location.href = `${ROUTES.ACCOUNT}`
					})
					.catch(error => {
						this.setState({
							error: {
                                error: true,
                                message: error.message
                            }
						}, () => console.log('⁉️error=', this.state.error))
					})
			}).catch(error => {
				this.setState({
					error: {
                        error: true,
                        message: error.message
                    }
				}, () => console.log('⁉️error=', this.state.error))
			})
	}

    render() {
		const { password, email, error } = this.state
		const { emailInvalid, emailInvalidText } = this.state
        const { validateEmail, account } = this.context

        const isValid = validateEmail(email) && email !== account.email && password !== ''

        return (
            <Wrapper>
                <h1>Change Account Email</h1>
                    <Form onSubmit={e => this.handleEmailChange(e, email, password)}>
                        <PasswordInput
                            id="password"
                            name="password"
                            labelText="Current Password *"
                            placeholder="***************"
                            hideLabel={false}
							onChange={e => this.handleChange(e)}
							onBlur={e => this.validateCurrentPassword(e)}
                        />
                        <TextInput
                            id="email"
                            name="email"
                            labelText="New Email *"
                            type="email"
                            placeholder="Stephen.Alt@ibm.com"
							hideLabel={false}
							invalid={emailInvalid}
							invalidText={emailInvalidText}
							onChange={e => this.handleChange(e)}
                            onBlur={e => this.validateEmail(e)}
                        />

                        {error.error ? (
                                <div style={{ textAlign: 'left', marginBottom: 20, lineHeight: 2 }}>
                                    <span role="img" aria-label="warning">⚠️</span>{' '}
                                    {error.message}
                                </div>
                            ) : (
                                ''
                        )}

                        <Button kind="primary" disabled={!isValid} type="submit">
                            Change My Email
                        </Button>
                    </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangeEmailForm)
