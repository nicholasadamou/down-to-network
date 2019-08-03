import React, { Component } from 'react'

import { Form, TextInput, Select, SelectItem } from 'carbon-components-react'

import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton'

import AccountContext from '../../../../../contexts/Account/AccountContext'

import { withFirebase } from '../../../../../components/Firebase'

import ActionBar from './ActionBar'

class PersonalDetails extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = {
            error: false,
            errorMessage: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: ""
        }

        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.back = this.back.bind(this)

        this.handleUploadStart = this.handleUploadStart.bind(this)
        this.handleProgress = this.handleProgress.bind(this)
        this.handleUploadError = this.handleUploadError.bind(this)
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
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
        this.props.prevStep()
    }

    handleUploadStart = () => this.setState({ error: false, isUploading: true, progress: 0 })
    
    handleProgress = progress => this.setState({ progress })
    
    handleUploadError = error => {
        this.setState({ isUploading: false })
        
        this.setState({
            error: true,
            errorMessage: error.message
        }, () => console.log('error=', this.state.errorMessage))
    }

    handleUploadSuccess = filename => {
        const { firebase } = this.props
        const { setAccount } = this.context

        this.setState({ avatar: filename, progress: 100, isUploading: false })

        firebase
        .app
        .storage()
        .ref(`${firebase.auth.user}/profilePicture/${filename}`)
        .child(filename)
        .getDownloadURL()
        .then(url => {
            this.setState({ avatarURL: url })
            setAccount('avatar', url)
        }).catch(error => {
			this.setState({
				error
			}, () => console.log('error=', error))
		})
    }

    render() {
        const { setAccount } = this.context
        const { firebase } = this.props
        const { error, errorMessage } = this.state

        return(
            <Form>
                <h1>Build your Profile</h1>
                <label className="bx--label">Profile Picture *</label>
                {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                {this.state.avatarURL && <img src={this.state.avatarURL} alt="avatar" />}
                <CustomUploadButton
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase.app.storage().ref(`${firebase.auth.user}/profilePicture`)}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    style={{ 
                        display: 'block',
                        width: '150px',
                        padding: 10,
                        backgroundColor: '#171717', 
                        color: 'white', 
                        cursor: 'pointer',
                        borderRadius: 4
                    }}
                >
                    Select a file
                </CustomUploadButton>
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

export default withFirebase(PersonalDetails)