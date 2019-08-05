import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

import Layout from '../../../components/Layout/Layout'
import MenuBar from '../../../components/MenuBar'

const { PasswordInput } = TextInput

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;

	padding: 10px;

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

class ChangePasswordPage extends Component {
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
    }

    handleChange = e => {
        this.setState({ 
                [e.target.name]: e.target.value 
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
    }

    render() {
        const { password, passwordOne, passwordTwo } = this.state
        const { validatePassword, handleChangePassword } = this.context

        const isValid = password !== '' && passwordOne === passwordTwo && passwordOne !== ''

        return (
            <Layout>
                <Wrapper>
                    <h1>Change Account Password</h1>
                    <Form onSubmit={e => handleChangePassword(e, passwordOne, password)}>
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

                        <Button kind="primary" disabled={!isValid} type="submit">
                            Change My Password
                        </Button>
                    </Form>
                </Wrapper>
                <MenuBar />
            </Layout>
        )
    }
}

export default withFirebase(ChangePasswordPage)