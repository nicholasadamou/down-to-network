import React from 'react'

import styled from 'styled-components'

import { Button, SkeletonPlaceholder, SkeletonText } from 'carbon-components-react'

import * as ROUTES from '../../constants/routes'

import { isMobile } from '../../lib/utils'

import AccountContext from '../../contexts/Account/AccountContext'

import ToggleContent from '../../components/Modal/ToggleContent'
import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

import ChangeProfilePictureModal from './components/ChangeProfilePictureModal'
import ChangeRoleForm from './components/ChangeRoleForm'
import ChangeMatchSettingsForm from './components/ChangeMatchSettingsForm'
import SignOutButton from './components/SignOutButton'

import './index.scss'

// TODO: Test overall account management

const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;

	padding: 20px;
	margin-bottom: 50px;

	overflow-x: hidden;

	@media (max-width: 375px) {
		width: 100%;

		padding: 10px;

		margin-bottom: 40px;

		.manage_account_button {
			max-width: 100%;
			width: 100%;

			margin: 10px 0;
		}
	}

	h1 {
		margin-bottom: 20px;

		font-weight: bold;
		font-size: medium;
	}

	.bx--modal-container {
		width: 400px;
    	max-width: 400px;

		.bx--modal-content {
			padding: 0;
			margin: 10px auto;
			margin-bottom: 30px;

			form {
				text-align: center;

				p {
					font-size: inherit;
				}

				.bx--file__selected-file {
					background: #e5e5e5;
				}
			}
		}
	}
`

const ProfilePictureWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	margin-bottom: 20px;

	.bx--skeleton__placeholder {
		margin: 0 auto;

		border-radius: 100%;

		overflow: hidden;
	}

	img {
		width: 100px;
		border-radius: 100%;
	}
`

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;

	margin-left: 10px;

	p {
		margin: 10px;
		margin-left: 0;

		font-size: larger;
		font-weight: bold;
	}

	.manage_account_button {
		padding: 0;
		margin: 0;

		font-weight: bold;
		font-size: small;
		color: #0061ff;

		border: none;
		outline: none;

		background: none;

		&:hover {
			text-decoration: underline;

			cursor: pointer;
		}
	}
`

class AccountPage extends React.Component {
	static contextType = AccountContext

	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {}

	render() {
		const { account, loading } = this.context

		return (
			<Layout>
				<Wrapper>
					<h1 style={{ fontSize: 'x-large' }}>Manage Your Profile</h1>
					<ProfilePictureWrapper>
						{ loading
							?
								<SkeletonPlaceholder style={{ width: '100px' }} />
							:
								account.profilePicture !== ''
								?
									<img src={account.profilePicture} alt="profilePicture" /> 
								:
									''
						}
						<Container>
							{
								loading
									?
										<SkeletonText style={{ width: '35%' }} />
									:
										<p>{account.name}</p>
							}
							{ 
								!isMobile.any()
									?
										<ToggleContent
											toggle={show => (
												<button 
													className="manage_account_button"
													onClick={show}
												>
													Change Profile Picture
												</button>
											)}
											content={hide => (
												<ChangeProfilePictureModal hide={hide} />
											)}
										/>
									:
										<button
											className="manage_account_button" 
											onClick={() => {
												window.location.href = `${ROUTES.CHANGE_PROFILE_PICTURE}`
											}}
										>
											Change Profile Picture
										</button>
							}
						</Container>
					</ProfilePictureWrapper>
					<ChangeMatchSettingsForm />
					<ChangeRoleForm />
					<Button 
						kind="secondary"
						className="manage_account_button"
						onClick={() => {
							window.location.href = `${ROUTES.CHANGE_EMAIL}`
						}}
					>
						Change Email
					</Button>
					<Button 
						kind="secondary"
						className="manage_account_button"
						onClick={() => {
							window.location.href = `${ROUTES.CHANGE_PASSWORD}`
						}}
					>
						Change Password
					</Button>
					<SignOutButton />
					<Button 
						kind="danger"
						className="manage_account_button"
						onClick={() => {
							window.location.href = `${ROUTES.CLOSE_ACCOUNT}`
						}}
					>
						Close my account?
					</Button>
				</Wrapper>
				<MenuBar />
			</Layout>
		)
	}
}

export default AccountPage
