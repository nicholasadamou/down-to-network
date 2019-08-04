import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, FileUploader, SkeletonPlaceholder } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

const Wrapper = styled.div`
    margin-bottom: 20px;

    label {
        margin: 0;

        width: 25%;

        @media (max-width: 375px) {
            width: 51%;
        }
    }
`

class ChangeProfilePictureForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = { 
            removeImageBtnDisabled: true
        }
    }

    render() {
        const { removeImageBtnDisabled } = this.state
        const { handleChangeProfilePicture, setAvatar, removeAvatar, avatar, account, loading, error } = this.context

        const isValid = avatar !== '';

        let fileUploader

        return (
            <Wrapper>
                <h1>Change Account Profile Picture</h1>
                <Form onSubmit={handleChangeProfilePicture}>
                    { loading
                        ?
                            <SkeletonPlaceholder />
                        :
                            account.avatar !== '' && avatar === ''
                            ?
                                <img src={account.avatar} alt="avatar" style={{ width: '25%' }} /> 
                            :
                                <img src={avatar} alt="avatar" style={{ width: '25%' }} /> 
                    }
                    <FileUploader
                        labelTitle="Profile Picture"
                        labelDescription="only .jpg, .jpeg files at 500MB or less."
                        buttonLabel="Choose a image"
                        name="avatar"
                        filenameStatus="complete"
                        accept={['.jpg', '.jpeg']}
                        ref={node => (fileUploader = node)}
                        onChange={e => {
                            this.setState({
                                removeImageBtnDisabled: false
                            })

                            setAvatar(e.target.files[0])
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
                            removeAvatar()
                        }}
                    >
                        Remove image
                    </Button>

                    {error ? (
                        <div style={{ lineHeight: 2, marginBottom: 20 }}>
                            <span role="img" aria-label="warning">⚠️</span>  
                            {error.message}
                        </div>
                    ) : (
                        ''
                    )}

                    <Button 
                        kind="primary" 
                        disabled={!isValid}
                        type="submit"
                        style={{ display: 'block', margin: 0, marginTop: 10 }}
                    >
                        Change My Profile Picture
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangeProfilePictureForm)