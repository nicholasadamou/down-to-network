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

        .bx--text-input--password__visibility {
            width: initial;
        }
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
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    handleChange = e => {
        this.setState({ 
                [e.target.name]: e.target.value 
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
    }

    handleEmailChange = (e, email, password) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.context

		// Reauthenticate user before proceeding
		this.reauthenticate(password)
			.then(() => {
				user
					.updateEmail(email)
					.then(() => {
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
						}, () => console.log('error=', this.state.error))
					})
			}).catch(error => {
				this.setState({
					error: {
                        error: true,
                        message: error.message
                    }
				}, () => console.log('error=', this.state.error))
			})
	}

    render() {
        const { password, email, error } = this.state
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
                            onBlur={e => {
                                this.handleChange(e)
                            }}
                        />
                        <TextInput
                            id="email"
                            name="email"
                            labelText="New Email *"
                            type="email"
                            placeholder="Stephen.Alt@ibm.com"
                            hideLabel={false}
                            onBlur={e => {
                                const email = e.target.value

                                if (validateEmail(email) && email !== account.email) {
                                    this.setState({
                                        error: {
                                            error: false,
                                            message: ''
                                        }
                                    })

                                    this.handleChange(e)
                                } else if (validateEmail(email) && email === account.email) {
                                    this.setState({
                                        error: {
                                            error: true,
                                            message: 'The email address that was entered is the same as the old one.'
                                        }
                                    })
                                } else {
                                    this.setState({
                                        error: {
                                            error: false,
                                            message: 'The email address that was entered is invaild.'
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
                            Change My Email
                        </Button>
                    </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangeEmailForm)