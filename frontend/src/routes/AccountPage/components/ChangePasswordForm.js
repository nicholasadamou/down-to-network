import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

const { PasswordInput } = TextInput

const Wrapper = styled.div`
    margin-bottom: 20px;
`

class ChangePasswordForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = { 
            error: null,
            errorMessage: ''
        }
    }

    render() {
        const { errorMessage } = this.state
        const { passwordOne, passwordTwo, validatePassword, handleChangePassword, setPassword } = this.context

        const isValid = passwordOne === passwordTwo && passwordOne !== ''

        return (
            <Wrapper>
                <h1>Change Account Password</h1>
                <Form onSubmit={handleChangePassword}>
                    <PasswordInput
                        id="passwordOne"
                        name="passwordOne"
                        labelText="Password"
                        helperText="At least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length."
                        placeholder="***************"
                        hideLabel={false}
                        onBlur={e => {
                            const password = e.target.value

                            if (validatePassword(password)) {
                                this.setState({
                                    error: false
                                })

                                setPassword('passwordOne', password)
                            } else {
                                this.setState({
                                    error: true,
                                    errorMessage: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
                                })
                            }
                        }}
                    />
                    <PasswordInput
                        id="passwordTwo"
                        name="passwordTwo"
                        labelText="Confirm your password"
                        placeholder="***************"
                        hideLabel={false}
                        onBlur={e => {
                           const password = e.target.value

                            if (validatePassword(password)) {
                                this.setState({
                                    error: false
                                })

                                setPassword('passwordTwo', password)
                            } else {
                                this.setState({
                                    error: true,
                                    errorMessage: 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.'
                                })
                            }
                        }}
                    />
                    
                    {this.state.error || this.context.error ? (
                        <div style={{ lineHeight: 2, marginBottom: 20 }}>
                            <span role="img" aria-label="warning">⚠️</span>  
                            {(errorMessage && errorMessage) || (this.context.error.message && this.context.error.message)}
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