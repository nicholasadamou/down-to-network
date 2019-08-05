import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, Select, SelectItem } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

const Wrapper = styled.div`
    margin-bottom: 10px;

    width: 100%;

    .bx--select-input, .bx--select {
        width: 100%;
        max-width: 100%;
    }
`

class RoleChangeForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = { }
    }

    render() {
        const { handleChangeRole, setRole, role } = this.context

        const isValid = role !== '' && role !== 'placeholder-item'

        return (
            <Wrapper>
                <h1>Change Account Role</h1>
                <Form onSubmit={handleChangeRole}>
                    <Select
                    id="role"
                    labelText="Role / Domain"
                    defaultValue="placeholder-item"
                    onBlur={e => setRole(e.target.value)}
                >
                    <SelectItem
                        value="placeholder-item"
                        text="Choose an option"
                    />
                    <SelectItem
                        value="New Hire"
                        text="New Hires"
                    />
                    <SelectItem
                        value="Interns"
                        text="Interns"
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

                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Role
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(RoleChangeForm)