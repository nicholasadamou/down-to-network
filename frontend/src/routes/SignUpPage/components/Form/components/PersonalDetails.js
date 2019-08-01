import React, { Component } from 'react';

import { Form, TextInput, Select, SelectItem } from 'carbon-components-react'

import Context from '../../../../../contexts/Context'

import ActionBar from './ActionBar'

class PersonalDetails extends Component {
    static contextType = Context

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            errorMessage: ''
        }

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.back = this.back.bind(this)
    }

    saveAndContinue = () => {
        const { account } = this.context

        if (account.firstName !== undefined && account.lastName !== undefined && account.role !== undefined) {
            this.props.nextStep()
        } else {
            this.setState({
                error: true,
                errorMessage: 'Fields, first-name, last-name, and role are required to continue.'
            })
        }
    }

    back = () => {
        this.props.prevStep();
    }

    render() {
        const { setAccount } = this.context
        const { error, errorMessage } = this.state

        return(
            <Form>
                <h1>Build your Profile</h1>
                <TextInput
                    id="first-name"
                    name="first-name"
                    labelText="First Name *"
                    type="text"
                    placeholder="Stephen"
                    hideLabel={false}
                    onBlur={e => {
                        this.setState({
                            error: false
                        })

                        setAccount('first-name', e)
                    }}
                />
                <TextInput
                    id="last-name"
                    name="last-name"
                    labelText="Last Name *"
                    type="text"
                    placeholder="Alt"
                    hideLabel={false}
                    onBlur={e => {
                        this.setState({
                            error: false
                        })

                        setAccount('last-name', e)
                    }}
                />
                <Select
                    id="role"
                    labelText="Role / Domain *"
                    onBlur={e => {
                        this.setState({
                            error: false
                        })
                        
                        setAccount('role', e)
                    }}
                >
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
                <ActionBar
                    back={this.back}
                    next={this.saveAndContinue}
                    backTextLabel="Back"
                    nextTextLabel="Next"
                />

                {error ? (
                    <span className="error-message">
                        <span role="img" aria-label="warning">⚠️</span>
                        {errorMessage}
                    </span>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}

export default PersonalDetails