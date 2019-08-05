import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button, FileUploader, SkeletonPlaceholder } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

import Layout from '../../../components/Layout/Layout'
import MenuBar from '../../../components/MenuBar'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;

	padding: 10px;

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

class ChangeProfilePicturePage extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = { 
            removeImageBtnDisabled: true
        }
    }

    render() {
        const { removeImageBtnDisabled } = this.state
        const { handleChangeProfilePicture, setprofilePicture, removeprofilePicture, profilePicture, account, loading, error } = this.context

        const isValid = profilePicture !== '';

        let fileUploader

        return (
            <Layout>
                <Wrapper>
                    <h1>Change Account Profile Picture</h1>
                    <Form onSubmit={handleChangeProfilePicture}>
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

                                setprofilePicture(e.target.files[0])
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
                                removeprofilePicture()
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
                <MenuBar />
            </Layout>
        )
    }
}

export default withFirebase(ChangeProfilePicturePage)