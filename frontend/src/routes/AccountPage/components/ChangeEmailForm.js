import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

const Wrapper = styled.div`
    margin-bottom: 20px;
`

class EmailChangeForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = { 
            error: null,
            errorMessage: '',
            emails: []
        }
    }

    componentDidMount() {
        const { firebase } = this.props
        
        firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                firebase.getValue(`users/${authUser.uid}`).then(snapshot => {
					const account = snapshot.val()
                    const { email } = account

					firebase.users().then(response => {
                        this.setState({
                            emails: response.filter(account => account.email !== email).map(account => account.email)
                        }, () => console.log('emails=', this.state.emails))
                    })
				})
            }
        })
    }

    render() {
        const { emails, errorMessage } = this.state
        const { validateEmail, handleEmailChange, setEmail, email, account } = this.context

        const isValid = validateEmail(email) && email !== account.email && !emails.includes(email)

        return (
            <Wrapper>
                <h1>Change Account Email</h1>
                <Form onSubmit={handleEmailChange}>
                    <TextInput
                        id="email"
                        name="email"
                        labelText="Email *"
                        type="email"
                        placeholder={account.email}
                        hideLabel={false}
                        onBlur={e => {
                            const email = e.target.value

                            if (validateEmail(email) && email !== account.email && !emails.includes(email)) {
                                this.setState({
                                    error: false
                                })

                                setEmail(e, email)
                            } else if (validateEmail(email) && email === account.email && !emails.includes(email)) {
                                this.setState({
                                    error: true,
                                    errorMessage: 'The email address that was entered is the same as the old one.'
                                })
                            } else if (validateEmail(email) && email !== account.email && emails.includes(email)) { 
                                this.setState({
                                    error: true,
                                    errorMessage: 'The email address that was entered is already in use.'
                                })
                            } else {
                                this.setState({
                                    error: true,
                                    errorMessage: 'The email address that was entered is invaild.'
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
                        Change My Email
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(EmailChangeForm)