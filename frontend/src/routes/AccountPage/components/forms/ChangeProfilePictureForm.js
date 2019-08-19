import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, FileUploader, SkeletonPlaceholder } from 'carbon-components-react'

import * as ROUTES from '../../../../constants/routes'

import { withFirebase } from '../../../../contexts/Firebase'

import AccountContext from '../../../../contexts/Account/AccountContext'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;

	padding: 10px;

    overflow-x: hidden;

    img {
        width: 100px;
        border-radius: 100%;
    }

    @media (max-width: 375px) {
        .bx--form {
            text-align: center;

            width: 100%;

            .bx--skeleton__placeholder {
                margin: 0 auto;

                border-radius: 100%;

                overflow: hidden;
            }

            .bx--file__selected-file {
                text-align: left;
            }

            button, label, .bx--file__selected-file {
                width: 100%;
                max-width: 100%;
            }
        }
    }

    h1 {
		margin-bottom: 20px;

		font-size: larger;
		font-weight: bold;
	}
`

const INITIAL_ERROR_STATE = {
    error: false,
    message: ''
}

class ChangeProfilePictureForm extends Component {
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
        this.handleChangeProfilePicture = this.handleChangeProfilePicture.bind(this)
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

    handleChangeProfilePicture = (e, profilePicture) => {
		e.preventDefault()

		const { firebase } = this.props
		const { user, account } = this.context

		firebase
			.user(`${user.uid}`).update({
				profilePicture
			})
			.then(() => {
				// Update account profilePicture
				account.profilePicture = profilePicture

				// Redirect to account page
				window.location.href = `${ROUTES.ACCOUNT}`
			})
			.catch(error => {
				this.setState({
					error: {
                        error: true,
                        message: error.message
                    }
				}, () => console.log('⁉️error=', this.state.error))
			})
	}

    render() {
        const { profilePicture, removeImageBtnDisabled, error } = this.state
        const { account, loading } = this.context

        const isValid = profilePicture !== '';

        let fileUploader

        return (
            <Wrapper>
                <h1>Change Account Profile Picture</h1>
                <Form onSubmit={e => this.handleChangeProfilePicture(e, profilePicture)}>
                    { loading
                        ?
                            <SkeletonPlaceholder />
                        :
                            account.profilePicture !== '' && profilePicture === ''
                            ?
                                <img src={account.profilePicture} alt="profilePicture" />
                            :
                                <img src={profilePicture} alt="profilePicture" />
                    }
                    <FileUploader
                        labelTitle="Profile Picture"
                        labelDescription="only .jpg, .jpeg files at 500MB or less."
                        buttonLabel="Choose a image"
                        name="profilePicture"
                        filenameStatus="complete"
                        accept={['.jpg', '.jpeg']}
                        ref={node => (fileUploader = node)}
                        onChange={e => {
                            this.setState({
                                removeImageBtnDisabled: false
                            })

                            this.selectProfilePicture(e)
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
                        }}
                    >
                        Remove image
                    </Button>

                    {error.error ? (
                        <div style={{ lineHeight: 2, marginBottom: 20 }}>
                            <span role="img" aria-label="warning">⚠️</span>{' '}
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
