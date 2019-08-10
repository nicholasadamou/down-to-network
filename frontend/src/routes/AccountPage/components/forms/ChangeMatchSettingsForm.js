
import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button } from 'carbon-components-react'

import * as ROUTES from '../../../../constants/routes'

import { withFirebase } from '../../../../contexts/Firebase'

import AccountContext from '../../../../contexts/Account/AccountContext'

import MultiSelect from '../../../../components/MultiSelect/MultiSelect'

const Wrapper = styled.div`
    margin-bottom: 10px;

    width: 100%;
`

const INITIAL_ERROR_STATE = {
    error: false,
    message: ''
}

class ChangeMatchSettingsForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            matchSettings: [],
            error: {
                ...INITIAL_ERROR_STATE
            }
        }

        this.setMatchSettings = this.setMatchSettings.bind(this)
        this.handleChangeMatchSettings = this.handleChangeMatchSettings.bind(this)
    }

    setMatchSettings = e => {
        this.setState({
            matchSettings: e.selectedItems.map(setting => setting.id)
        }, () => console.log('matchSettings=', this.state.matchSettings))
    }

    	handleChangeMatchSettings = (e, matchSettings) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.context

		firebase
			.ref(`users/${user.uid}`).update({
				matchSettings
			})
			.then(() => {
				// Update account match-settings
				account.matchSettings = matchSettings

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
        const { matchSettings, error } = this.state

        const isValid = matchSettings.length !== 0

        return (
            <Wrapper>
                <h1>Change Match Settings</h1>
                <Form onSubmit={e => this.handleChangeMatchSettings(e, matchSettings)}>
                    <MultiSelect
                        id="match-settings"
                        titleText="Who do you want to meet?"
                        label="Select all that apply"
                        handleOnChange={e =>  this.setMatchSettings(e)}
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
                        Change My Match Settings
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangeMatchSettingsForm)
