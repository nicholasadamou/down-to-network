import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, TextInput } from 'carbon-components-react'

import * as ROUTES from '../../../../constants/routes'

import { withFirebase } from '../../../../contexts/Firebase'

import AccountContext from '../../../../contexts/Account/AccountContext'

const Wrapper = styled.div`
    margin-bottom: 10px;

    width: 100%;

    .bx--select-input, .bx--select {
        width: 100%;
        max-width: 100%;
    }
`

const INITIAL_ERROR_STATE = {
    error: false,
    message: ''
}

class NameChangeForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            error: {
                ...INITIAL_ERROR_STATE
			},
			nameInvalid: false,
			nameInvalidText: ''
        }

		this.handleChange = this.handleChange.bind(this)
		this.validateName = this.validateName.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
    }

    handleChange = e => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
	}

	validateName = e => {
		const name = e.target.value

		if (name === '') {
			this.setState({
				nameInvalid: true,
				nameInvalidText: 'Name field must not be empty.'
			})
		}

		this.setState({
			nameInvalid: false,
			nameInvalidText: ''
		})
	}

    handleChangeName = (e, name) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.context

		firebase
			.user(`${user.uid}`).update({
				name
			})
			.then(() => {
				// Update account name
				account.name = name

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
	}

    render() {
        const { name, nameInvalid, nameInvalidText, error } = this.state

        const isValid = name !== ''

        return (
            <Wrapper>
                <h1>Change Account Name</h1>
                <Form onSubmit={e => this.handleChangeName(e, name)}>
					<TextInput
						id="name"
						name="name"
						labelText="New Name *"
						type="text"
						placeholder="Stephen Alt"
						hideLabel={false}
						invalid={nameInvalid}
						invalidText={nameInvalidText}
						onChange={e => this.handleChange(e)}
						onBlur={e => this.validateName(e)}
					/>

                    {error.error ? (
                            <div style={{ marginBottom: 20, lineHeight: 2 }}>
                                <span role="img" aria-label="warning">⚠️</span>
                                {error.message}
                            </div>
                        ) : (
                            ''
                    )}

                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Name
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(NameChangeForm)
