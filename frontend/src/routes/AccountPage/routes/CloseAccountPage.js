import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, TextInput, Button } from 'carbon-components-react'

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

class CloseAccountPage extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            password: ''
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
        const { password } = this.state
        const { handleCloseAccount, error } = this.context

        const isValid = password !== '';

        return (
            <Layout>
                <Wrapper>
                    <h1>Close Account</h1>
                    <p><span role="img" aria-label="warning">⚠️</span><u><strong>Please note</strong></u>: Closing an account is a sensitive process and once completed, it <strong>cannot</strong> be undone. If you are <strong>sure</strong> you want to close your account, type in your <em>current password</em> and press the <em>Close my account</em> button.</p>
                    <Form onSubmit={e => handleCloseAccount(e, password)}>
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

                        {error ? (
                                <div style={{ lineHeight: 2, marginBottom: 20 }}>
                                    <span role="img" aria-label="warning">⚠️</span>  
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
                <MenuBar />
            </Layout>
        )
    }
}

export default withFirebase(CloseAccountPage)