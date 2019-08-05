
import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

import MultiSelect from '../../../components/MultiSelect/MultiSelect'

const Wrapper = styled.div`
    margin-bottom: 10px;

    width: 100%;
`

class ChangeMatchSettingsForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            matchSettings: []
        }

        this.setMatchSettings = this.setMatchSettings.bind(this)
    }

    setMatchSettings = e => {
        this.setState({
            matchSettings: e.selectedItems.map(setting => setting.id)
        }, () => console.log('matchSettings=', this.state.matchSettings))
    }

    render() {
        const { matchSettings } = this.state
        const { handleChangeMatchSettings } = this.context

        const isValid = matchSettings.length !== 0

        return (
            <Wrapper>
                <h1>Change Match Settings</h1>
                <Form onSubmit={e => handleChangeMatchSettings(e, matchSettings)}>
                    <MultiSelect
                        id="match-settings"
                        titleText="Who do you want to meet?"
                        label="Select all that apply"
                        handleOnChange={e =>  this.setMatchSettings(e)}
                    />
                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Match Settings
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangeMatchSettingsForm)