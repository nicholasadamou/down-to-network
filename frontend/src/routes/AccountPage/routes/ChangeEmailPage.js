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

class EmailChangePage extends Component {
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
    }

    handleChange = e => {
        this.setState({ 
                [e.target.name]: e.target.value 
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
    }


    render() {
        const { password, email } = this.state
        const { validateEmail, handleEmailChange, account } = this.context

        const isValid = validateEmail(email) && email !== account.email && password !== ''

        return (
            <Layout>
                <Wrapper>
                    <h1>Change Account Email</h1>
                    <Form onSubmit={e => handleEmailChange(e, email, password)}>
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

                        {this.state.error.error || this.context.error ? (
                                <div style={{ lineHeight: 2, marginBottom: 20 }}>
                                    <span role="img" aria-label="warning">⚠️</span>  
                                    {this.state.error.message || this.context.error.message}
                                </div>
                            ) : (
                                ''
                        )}

                        <Button kind="primary" disabled={!isValid} type="submit">
                            Change My Email
                        </Button>
                    </Form>
                </Wrapper>
                <MenuBar />
            </Layout>
        )
    }
}

export default withFirebase(EmailChangePage)