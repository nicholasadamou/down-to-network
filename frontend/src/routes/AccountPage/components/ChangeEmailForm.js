import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

const { PasswordInput } = TextInput

const Wrapper = styled.div`
    margin-bottom: 20px;
`

class EmailChangeForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { validateEmail, handleEmailChange, setEmail, email, account, setAccount, setError } = this.context

        const isValid = validateEmail(email) && email !== account.email && account.password !== ''

        return (
            <Wrapper>
                <h1>Change Account Email</h1>
                <Form onSubmit={handleEmailChange}>
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
                    <TextInput
                        id="email"
                        name="email"
                        labelText="Email"
                        type="email"
                        placeholder="Stephen.Alt@ibm.com"
                        hideLabel={false}
                        onBlur={e => {
                            const email = e.target.value

                            if (validateEmail(email) && email !== account.email) {
                                setError(false, '')

                                setEmail(e, email)
                            } else if (validateEmail(email) && email === account.email) {
                                setError(true, 'The email address that was entered is the same as the old one.')
                            } else if (validateEmail(email) && email !== account.email) { 
                                setError(true, 'The email address that was entered is already in use.')
                            } else {
                                setError(true, 'The email address that was entered is invaild.')
                            }
                        }}
                    />

                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Email
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(EmailChangeForm)