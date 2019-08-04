import React, { Component } from 'react'

import { Form, FileUploader, Button, TextInput, Select, SelectItem } from 'carbon-components-react'

import AccountContext from '../../../../../contexts/Account/AccountContext'

import ActionBar from './ActionBar'

class PersonalDetails extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            errorMessage: '',
            removeImageBtnDisabled: true
        }

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.back = this.back.bind(this)
    }

    saveAndContinue = () => {
        const { account } = this.context

        if (account.avatar !== undefined && account.firstName !== undefined && account.lastName !== undefined && account.role !== undefined) {
            this.props.nextStep()
        } else {
            this.setState({
                error: true,
                errorMessage: 'Fields, profile-picture, first-name, last-name, and role are required to continue.'
            })
        }
    }

    back = () => {
        this.props.prevStep()
    }

    render() {
        const { setAccount, removeAccountAttributeByKey } = this.context
        const { removeImageBtnDisabled, error, errorMessage } = this.state

        let fileUploader;

        return(
            <Form>
                <h1>Build your Profile</h1>
                <FileUploader
                    labelTitle="Profile Picture *"
                    labelDescription="only .jpg, .jpeg files at 500MB or less."
                    buttonLabel="Choose a image"
                    name="avatar"
                    filenameStatus="complete"
                    accept={['.jpg', '.jpeg']}
                    ref={node => (fileUploader = node)}
                    onChange={e => {
                        this.setState({
                            error: false,
                            removeImageBtnDisabled: false
                        })

                        setAccount('avatar', e.target.files[0])
                    }}
                />
                <Button
                    kind="secondary"
                    disabled={removeImageBtnDisabled}
                    onClick={() => {
                        this.setState({
                            removeImageBtnDisabled: true
                        })

                        fileUploader.clearFiles()
                        removeAccountAttributeByKey('avatar')
                    }}
                >
                    Remove image
                </Button>
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
                    defaultValue="placeholder-item"
                    onBlur={e => {
                        this.setState({
                            error: false
                        })
                        
                        setAccount('role', e)
                    }}
                >
                    <SelectItem
                        disabled
                        hidden
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
                <ActionBar
                    back={this.back}
                    next={this.saveAndContinue}
                    backTextLabel="Back"
                    nextTextLabel="Next"
                />

                {error ? (
                    <span style={{ lineHeight: 2 }}>
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