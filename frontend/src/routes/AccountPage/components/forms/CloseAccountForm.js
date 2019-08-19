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

        em {
            font-style: italic;
        }
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
`

const INITIAL_ERROR_STATE = {
    error: false,
    message: ''
}

class CloseAccountForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            error: {
                ...INITIAL_ERROR_STATE
            }
        }

		this.handleChange = this.handleChange.bind(this)
		this.validateCurrentPassword = this.validateCurrentPassword.bind(this)
        this.handleCloseAccount = this.handleCloseAccount.bind(this)
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

    handleCloseAccount = (e, password) => {
		e.preventDefault()

		const { firebase } = this.props
		const { isAuthenticated, reauthenticate, user, reset } = this.context

		if (window.confirm('Are you sure you want to close your account? This cannot be undone!')) {
			if (isAuthenticated()) {
				// Re-authenticate user before proceeding
				reauthenticate(password).then(() => {
					// Remove user from auth system
					user
					.delete()
					.then(() => {
						// Remove user from all user's match and rejection history
						firebase.ref(`users`).then(users => {
							// Remember who the current user is
							const currentUser = user

							users.forEach(user => {
								// Skip current user
								if (user.id !== currentUser.uid) {
									// Make sure that the user doesn't have an empty match history
									if (user.matches.length !== 0) {
										// Remove current user from this user's match history if user exists
										if (user.matches.includes(currentUser)) {
											firebase.ref(`users/${user.id}/matches/${currentUser.uid}`).remove()
										}
									}

									// Make sure that the user doesn't have an empty rejection history
									if (user.rejections.length !== 0) {
										// Remove current user from this user's rejection history if user exists
										if (user.rejections.includes(currentUser)) {
											firebase.ref(`users/${user.id}/rejections/${currentUser.uid}`).remove()
										}
									}
								}
							})
						}).catch(error => {
							this.setState({
								error: {
									error: true,
									message: error.message
								}
							}, () => console.log('⁉️error=', this.state.error))
						})

						// Remove user from real time database
						firebase.ref(`users/${user.uid}`).remove()

						// Remove auth token
						localStorage.removeItem('authUser')

						// Reset state
						reset()

						// Redirect to landing page
						window.location.href = `${ROUTES.LANDING}`
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
			}
		}
	}

    render() {
        const { password, error } = this.state

        const isValid = password !== '';

        return (
            <Wrapper>
                <h1>Close Account</h1>
                <p><span role="img" aria-label="warning">⚠️</span><u><strong>Please note</strong></u>: Closing an account is a sensitive process and once completed, it <strong>cannot</strong> be undone. If you are <strong>sure</strong> you want to close your account, type in your <em>current password</em> and press the <em>Close my account</em> button.</p>
                <Form onSubmit={e => this.handleCloseAccount(e, password)}>
                    <PasswordInput
                        id="password"
                        name="password"
                        labelText="Current Password *"
                        placeholder="***************"
                        hideLabel={false}
						onChange={e => this.handleChange(e)}
						onBlur={e => this.validateCurrentPassword(e)}
                    />

                    {error.error ? (
                            <div style={{ textAlign: 'left', marginBottom: 20, lineHeight: 2 }}>
                                <span role="img" aria-label="warning">⚠️</span>{' '}
                                {error.message}
                            </div>
                        ) : (
                            ''
                    )}

                    <Button
                        kind="danger"
                        disabled={!isValid}
                        type="submit"
                        style={{ display: 'block', margin: 0, marginTop: 10 }}
                    >
                        Close my account
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(CloseAccountForm)
