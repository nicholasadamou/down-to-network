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
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleChange = e => {
        this.setState({ 
                [e.target.name]: e.target.value 
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
    }

    handlePasswordChange = (e, newPassword, currentPassword) => {
		e.preventDefault()

		const { firebase } = this.props
		const { account } = this.context

		// Reauthenticate user before proceeding
		this.reauthenticate(currentPassword)
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
						}, () => console.log('error=', this.state.error))
					})
			})
			.catch(error => {
				this.setState({
					error: {
                        error: true,
                        message: error.message
                    }
				}, () => console.log('error=', this.state.error))
			})
	}

    render() {
        const { password, passwordOne, passwordTwo, error } = this.state
        const { validatePassword } = this.context

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
                        onBlur={e => {
                            this.handleChange(e)
                        }}
                    />
                    <PasswordInput
                        id="passwordOne"
                        name="passwordOne"
                        labelText="Password *"
                        helperText="At least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length."
                        placeholder="***************"
                        hideLabel={false}
                        onBlur={e => {
                            const password = e.target.value

                            if (validatePassword(password)) {
                                this.setState({
                                    error: {
                                        error: false,
                                        message: ''
                                    }
                                })

                                this.handleChange(e)
                            } else {
                            this.setState({
                                    error: {
                                        error: true,
                                        message: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
                                    }
                                })
                            }
                        }}
                    />
                    <PasswordInput
                        id="passwordTwo"
                        name="passwordTwo"
                        labelText="Confirm your password *"
                        placeholder="***************"
                        hideLabel={false}
                        onBlur={e => {
                        const password = e.target.value

                            if (validatePassword(password)) {
                                this.setState({
                                    error: {
                                        error: false,
                                        message: ''
                                    }
                                })

                                this.handleChange(e)
                            } else {
                                this.setState({
                                    error: {
                                        error: true,
                                        message: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
                                    }
                                })
                            }
                        }}
                    />

                    {error.error ? (
                            <div style={{ lineHeight: 2, marginBottom: 20 }}>
                                <span role="img" aria-label="warning">⚠️</span>  
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