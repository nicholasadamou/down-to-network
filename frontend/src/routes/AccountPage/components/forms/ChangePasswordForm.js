import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import * as ROUTES from '../../../../constants/routes'

import { withFirebase } from '../../../../contexts/Firebase'

import AccountContext from '../../../../contexts/Account/AccountContext'

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

        .bx--form__helper-text {
            text-align: left;
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

class ChangePasswordForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            passwordOne: '',
            passwordTwo: '',
            error: {
                ...INITIAL_ERROR_STATE
			},
			passwordOneInvalidText: '',
			passwordTwoInvalidText: '',
			passwordOneInvalid: false,
			passwordTwoInvalid: false,
        }

		this.handleChange = this.handleChange.bind(this)
		this.validateCurrentPassword = this.validateCurrentPassword.bind(this)
		this.validatePassword = this.validatePassword.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
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

	validatePassword = (e, password) => {
		const { validatePassword } = this.context

		const cell = {
			name: e.target.name,
			password: e.target.value
		}

		const target = {
			name: (e.target.name === 'passwordOne') ? 'passwordTwo' : 'passwordOne',
			password
		}

		if (!validatePassword(cell.password)) {
			this.setState({
				[`${cell.name}Invalid`]: true,
				[`${cell.name}InvalidText`]:
					'At least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length.',
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
			if (cell.password !== target.password) {
				this.setState({
					[`${cell.name}Invalid`]: true,
					[`${cell.name}InvalidText`]: `Both passwords do not match!`,
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
					[`${cell.name}Invalid`]: false,
					[`${target.name}Invalid`]: false,
				})
			}
		}
	}

    handlePasswordChange = (e, newPassword, currentPassword) => {
		e.preventDefault()

		const { firebase } = this.props
		const { account, reauthenticate } = this.context

		// Re-authenticate user before proceeding
		reauthenticate(currentPassword)
			.then(() => {
				firebase
					.doPasswordUpdate(newPassword)
					.then(() => {
						// Update account password
						account.password = newPassword

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
			})
			.catch(error => {
				this.setState({
					error: {
                        error: true,
                        message: error.message
                    }
				}, () => console.log('⁉️error=', this.state.error))
			})
	}

    render() {
		const { password, passwordOne, passwordTwo } = this.state
		const { error, passwordOneInvalid, passwordOneInvalidText, passwordTwoInvalid, passwordTwoInvalidText } = this.state

        const isValid = password !== '' && passwordOne === passwordTwo && passwordOne !== ''

        return (
            <Wrapper>
                <h1>Change Account Password</h1>
                <Form onSubmit={e => this.handleChangePassword(e, passwordOne, password)}>
                    <PasswordInput
                        id="password"
                        name="password"
                        labelText="Current Password *"
                        placeholder="***************"
						hideLabel={false}
						onChange={e => this.handleChange(e)}
						onBlur={e => this.validateCurrentPassword(e)}
                    />
                    <PasswordInput
                        id="passwordOne"
                        name="passwordOne"
                        labelText="Password *"
                        helperText="At least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length."
                        placeholder="***************"
						hideLabel={false}
						invalid={passwordOneInvalid}
						invalidText={passwordOneInvalidText}
                        onChange={e => this.handleChange(e)}
						onBlur={e => this.validatePassword(e, passwordTwo)}
                    />
                    <PasswordInput
                        id="passwordTwo"
                        name="passwordTwo"
                        labelText="Confirm your password *"
                        placeholder="***************"
						hideLabel={false}
						invalid={passwordTwoInvalid}
						invalidText={passwordTwoInvalidText}
                        onChange={e => this.handleChange(e)}
						onBlur={e => this.validatePassword(e, passwordOne)}
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
                        Change My Password
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangePasswordForm)
