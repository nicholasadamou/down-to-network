import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, Select, SelectItem } from 'carbon-components-react'

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

class RoleChangeForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            role: '',
            error: {
                ...INITIAL_ERROR_STATE
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeRole = this.handleChangeRole.bind(this)
    }

    handleChange = e => {
        this.setState({
                [e.target.name]: e.target.value
            }
        )

        console.log(`${e.target.name}=`, e.target.value)
    }

    handleChangeRole = (e, role) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.context

		firebase
			.user(`${user.uid}`).update({
				role
			})
			.then(() => {
				// Update account role
				account.role = role

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
        const { role, error } = this.state

        const isValid = role !== '' && role !== 'placeholder-item'

        return (
            <Wrapper>
                <h1>Change Account Role</h1>
                <Form onSubmit={e => this.handleChangeRole(e, role)}>
                    <Select
                        id="role"
                        name="role"
                        labelText="Role / Domain"
                        defaultValue="placeholder-item"
                        onBlur={e => this.handleChange(e)}
                    >
                        <SelectItem
                            value="placeholder-item"
                            text="Choose an option"
                        />
                        <SelectItem
                            value="New Hire"
                            text="New Hire"
                        />
                        <SelectItem
                            value="Intern"
                            text="Intern"
                        />
                        <SelectItem
                            value="Full Time IBMer"
                            text="Full Time IBMer"
                        />
                        <SelectItem
                            value="Manager"
                            text="Manager"
                        />
                    </Select>

                    {error.error ? (
                            <div style={{ marginBottom: 20, lineHeight: 2 }}>
                                <span role="img" aria-label="warning">⚠️</span>
                                {error.message}
                            </div>
                        ) : (
                            ''
                    )}

                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Role
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(RoleChangeForm)
