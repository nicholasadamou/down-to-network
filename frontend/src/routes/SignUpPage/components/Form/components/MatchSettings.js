import React, { Component } from 'react';

import { Form } from 'carbon-components-react'

import MultiSelect from './MultiSelect/MultiSelect'

import ActionBar from './ActionBar'

import AccountContext from '../../../../../contexts/Account/AccountContext'

class MatchSettings extends Component {
    static contextType = AccountContext

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

        if (account.matchSettings !== undefined) {
            this.props.nextStep()
        } else {
            this.setState({
                error: true,
                errorMessage: 'Match settings is required to finish the Sign Up process.'
            })
        }
    }

    back = () => {
        this.props.prevStep();
    }

    render() {
        const { setAccount, handleSignUp } = this.context
        const { errorMessage } = this.state

        return (
            <Form style={{ height: '100%' }}>
                <h1>Choose your Settings</h1>
                <MultiSelect
                    id="match-settings"
                    titleText="Who do you want to meet? *"
                    label="Select all that apply"
                    handleOnChange={e => {
                        this.setState({
                            error: false
                        })

                        setAccount('match-settings', e.selectedItems)
                    }}
                />
                <ActionBar
                    back={this.back}
                    next={handleSignUp}
                    backTextLabel="Back"
                    nextTextLabel="Sign Up"
                />
                {this.state.error || this.context.error ? (
                    <span style={{ lineHeight: 2 }}>
                        <span role="img" aria-label="warning">⚠️</span>
                        {(errorMessage && errorMessage) || (this.context.error.message && this.context.error.message)}
                    </span>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}

export default MatchSettings