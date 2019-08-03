import React, { Component } from 'react';

import { Form, TextInput } from 'carbon-components-react'

import ActionBar from './ActionBar'

import AccountContext from '../../../../../contexts/Account/AccountContext'

import * as ROUTES from '../../../../../constants/routes'

const { PasswordInput } = TextInput

class UserDetails extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            errorMessage: ''
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
                    error: true,
                    errorMessage: 'Both, email & password fields are required to continue.'
                })
            } else {
                if (!validateEmail(account.email)) {
                    this.setState({
                        error: true,
                        errorMessage: 'The email address that was entered is invaild.'
                    })
                } else if (!validatePassword(account.password)) {
                    this.setState({
                        error: true,
                        errorMessage: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
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
        const { error, errorMessage } = this.state

        return(
            <Form>
                <h1>Build your Profile</h1>
                <TextInput
                    id="email"
                    name="email"
                    labelText="Email *"
                    type="email"
                    placeholder="Stephen.Alt@ibm.com"
                    hideLabel={false}
                    onBlur={e => {
                        if (validateEmail(e.target.value)) {
                            this.setState({
                                error: false
                            })
                            
                            setAccount('email', e)
                        } else {
                            this.setState({
                                error: true,
                                errorMessage: 'The email address that was entered is invaild.'
                            })
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
                    onBlur={e => {
                        if (validatePassword(e.target.value)) {
                            this.setState({
                                error: false
                            })

                            setAccount('password', e)
                        } else {
                            this.setState({
                                error: true,
                                errorMessage: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
                            })
                        }
                    }}
                />
                <ActionBar
                    back={this.back}
                    next={this.saveAndContinue}
                    backTextLabel="Back"
                    nextTextLabel="Next"
                />

                {error ? (
                    <span className="error-message">
                        <span role="img" aria-label="warning">⚠️</span>
                        {errorMessage}
                    </span>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}

export default UserDetails