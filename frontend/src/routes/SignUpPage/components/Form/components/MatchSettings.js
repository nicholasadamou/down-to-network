import React, { Component } from 'react';

import { Form } from 'carbon-components-react'

import MultiSelect from '../../../../../components/MultiSelect/MultiSelect'

import ActionBar from './ActionBar'

import AccountContext from '../../../../../contexts/Account/AccountContext'

const INITIAL_ERROR_STATE = {
	error: false,
	message: ''
}

class MatchSettings extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            error: {
				...INITIAL_ERROR_STATE
			}
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
                error: {
					error: true,
					message: 'Match settings is required to finish the Sign Up process.'
				}
            })
        }
    }

    back = () => {
        this.props.prevStep();
    }

    render() {
        const { setAccount, handleSignUp } = this.context

        return (
            <Form>
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
                {this.state.error.error || this.context.error.error ? (
                    <span style={{ lineHeight: 2 }}>
                        <span role="img" aria-label="warning">⚠️</span>
                        {this.state.error.message || this.context.error.message}
                    </span>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}

export default MatchSettings
