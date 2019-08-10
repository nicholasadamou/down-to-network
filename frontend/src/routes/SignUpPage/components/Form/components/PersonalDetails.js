import React, { Component } from 'react'

import { Form, FileUploader, Button, TextInput, Select, SelectItem } from 'carbon-components-react'

import AccountContext from '../../../../../contexts/Account/AccountContext'

import ActionBar from './ActionBar'

const INITIAL_ERROR_STATE = {
	error: false,
	message: ''
}

class PersonalDetails extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
			profilePicture: '',
            error: {
				...INITIAL_ERROR_STATE
			},
            removeImageBtnDisabled: true
        }

		this.selectProfilePicture = this.selectProfilePicture.bind(this)
		this.removeprofilePicture = this.removeprofilePicture.bind(this)
        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.back = this.back.bind(this)
	}

	selectProfilePicture = e => {
        let reader = new FileReader()
        let file = e.target.files[0]

        if (file) {
            reader.readAsDataURL(file)
        }

        reader.addEventListener("load", () => {
            this.setState({
                profilePicture: reader.result
            }, () => console.log('profilePicture=', this.state.profilePicture))
        }, false)
	}

	removeprofilePicture = () => {
        this.setState({
            profilePicture: ''
        }, () => console.log('profilePicture=', this.state.profilePicture))
    }

    saveAndContinue = () => {
        const { account } = this.context

        if (account.profilePicture !== undefined && account.name !== undefined && account.role !== undefined) {
            this.props.nextStep()
        } else {
            this.setState({
                error: {
					error: true,
                	message: 'Fields, profile-picture, first-name, last-name, and role are required to continue.'
				}
            })
        }
    }

    back = () => {
        this.props.prevStep()
    }

    render() {
        const { setAccount, removeAccountAttributeByKey } = this.context
        const { profilePicture, removeImageBtnDisabled, error } = this.state

        let fileUploader;

        return(
            <Form>
                <h1>Build your Profile</h1>
				{
					profilePicture && (
						<img
							src={profilePicture}
							alt="profilePicture"
							style={{ width: '100px', borderRadius: 100 }}
						/>
					)
				}
                <FileUploader
                    labelTitle="Profile Picture *"
                    labelDescription="only .jpg, .jpeg files."
                    buttonLabel="Choose a image"
                    name="profilePicture"
                    filenameStatus="complete"
                    accept={['.jpg', '.jpeg']}
                    ref={node => (fileUploader = node)}
                    onChange={e => {
                        this.setState({
                            error: {
								...INITIAL_ERROR_STATE
							},
                            removeImageBtnDisabled: false
                        })

						this.selectProfilePicture(e)
                        setAccount('profilePicture', e.target.files[0])
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
						this.removeprofilePicture()
                        removeAccountAttributeByKey('profilePicture')
                    }}
                >
                    Remove image
                </Button>
                <TextInput
                    id="name"
                    name="name"
                    labelText="Name *"
                    type="text"
                    placeholder="Stephen Alt"
                    hideLabel={false}
                    onBlur={e => {
                        this.setState({
                            error: {
								...INITIAL_ERROR_STATE
							}
                        })

                        setAccount('name', e)
                    }}
                />
                <Select
                    id="role"
                    labelText="Role / Domain *"
                    defaultValue="placeholder-item"
                    onBlur={e => {
                        this.setState({
                            error: {
								...INITIAL_ERROR_STATE
							}
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

                {error.error ? (
                    <span style={{ lineHeight: 2 }}>
                        <span role="img" aria-label="warning">⚠️</span>
                        {error.message}
                    </span>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}

export default PersonalDetails
