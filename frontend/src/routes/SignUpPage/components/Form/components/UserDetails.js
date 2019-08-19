import React, { Component } from 'react';

import { Form, TextInput } from 'carbon-components-react'

import ActionBar from './ActionBar'

import AccountContext from '../../../../../contexts/Account/AccountContext'

import * as ROUTES from '../../../../../constants/routes'

const { PasswordInput } = TextInput

const INITIAL_ERROR_STATE = {
	error: false,
	message: ''
}

class UserDetails extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
			error: {
				...INITIAL_ERROR_STATE
			},
			passwordInvalid: false,
			passwordInvalidText: '',
			emailInvalid: false,
			emailInvalidText: ''
        }

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.back = this.back.bind(this)
    }

    saveAndContinue = () => {
        const { account, validateEmail, validatePassword } = this.context

        if (validateEmail(account.email) && validatePassword(account.password)) {
            this.props.nextStep()
            console.log('account=', account)
        } else {
            if (!validateEmail(account.email) && !validatePassword(account.password)) {
                this.setState({
                    error: {
						error: true,
						message: 'Both, email & password fields are required to continue.'
					},
					emailInvalid: true,
					passwordInvalid: true
                })
            } else {
                if (!validateEmail(account.email)) {
                    this.setState({
                        error: {
							error: true,
							message: 'The email address that was entered is invaild.'
						},
						emailInvalid: true
                    })
                } else if (!validatePassword(account.password)) {
                    this.setState({
                        error: {
							error: true,
							message: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
						},
						passwordInvalid: true
                    })
                }
            }
        }
    }

    back = () => {
        window.location.href = `${ROUTES.LANDING}`
    }

    render() {
        const { setAccount, validateEmail, validatePassword } = this.context
        const { error, emailInvalid, emailInvalidText, passwordInvalid, passwordInvalidText } = this.state

        return(
            <Form className="signup-form">
                <h1>Build your Profile</h1>
                <TextInput
                    id="email"
                    name="email"
                    labelText="Email *"
                    type="email"
                    placeholder="Stephen.Alt@ibm.com"
					hideLabel={false}
					invalid={emailInvalid}
					invalidText={emailInvalidText}
                    onBlur={e => {
						const email = e.target.value

                        if (validateEmail(email)) {
                            this.setState({
                                emailInvalidText: '',
								emailInvalid: false
                            })

                            setAccount('email', e)
                        } else {
							if (email === '') {
								this.setState({
									emailInvalidText: 'The Email Address field must not empty.',
									emailInvalid: true
								})
							} else {
								this.setState({
									emailInvalidText: 'The email address that was entered is invaild.',
									emailInvalid: true
								})
							}
                        }
                    }}
                />
                <PasswordInput
                    id="password"
                    name="password"
                    labelText="Password *"
                    helperText="At least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length."
                    placeholder="***************"
					hideLabel={false}
					invalid={passwordInvalid}
					invalidText={passwordInvalidText}
                    onBlur={e => {
						const password = e.target.value

                        if (validatePassword(password)) {
                            this.setState({
                                passwordInvalidText: '',
								passwordInvalid: false
                            })

                            setAccount('password', e)
                        } else {
							if (password === '') {
								this.setState({
									passwordInvalidText: 'The Password field must not empty.',
									passwordInvalid: true
								})
							} else {
								this.setState({
									passwordInvalidText: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.',
									passwordInvalid: true
								})
							}
                        }
                    }}
                />
                <ActionBar
                    back={this.back}
                    next={this.saveAndContinue}
                    backTextLabel="Back"
                    nextTextLabel="Next"
                />

                {error.error ? (
                    <span style={{ lineHeight: 2 }}>
                        <span role="img" aria-label="warning">⚠️</span>{' '}
                        {error.message}
                    </span>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}

export default UserDetails
