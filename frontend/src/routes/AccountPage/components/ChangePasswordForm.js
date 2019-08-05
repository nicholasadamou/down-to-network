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

        this.state = {}
    }

    render() {
        const { passwordOne, passwordTwo, validatePassword, handleChangePassword, setPassword, setAccount, account, setError } = this.context

        const isValid = account.password !== '' && passwordOne === passwordTwo && passwordOne !== ''

        return (
            <Wrapper>
                <h1>Change Account Password</h1>
                <Form onSubmit={handleChangePassword}>
                    <PasswordInput
                        id="currentPassword"
                        name="currentPassword"
                        labelText="Current Password *"
                        placeholder="***************"
                        hideLabel={false}
                        onBlur={e => {
                            setAccount('password', e.target.value)
                        }}
                    />
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
                                setError(false, '')

                                setPassword('passwordOne', password)
                            } else {
                                setError(true, 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.')
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
                                setError(false, '')

                                setPassword('passwordTwo', password)
                            } else {
                                setError(true, 'The password field requires at least one upper case and one lower case English character, at least one digit, at least one special character, and be at least 8 characters in length to be valid.')
                            }
                        }}
                    />

                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Password
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangePasswordForm)