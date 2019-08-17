import React from 'react'

import styled from 'styled-components'

import { Button, SkeletonPlaceholder, SkeletonText } from 'carbon-components-react'

import { compose } from 'recompose'

import { withEmailVerification, withAuthorization } from '../../contexts/Session'
import AccountContext from '../../contexts/Account/AccountContext'

import ToggleContent from '../../components/Modal/ToggleContent'
import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

import ChangeProfilePictureModal from './components/modals/ChangeProfilePictureModal'
import ChangeEmailModal from './components/modals/ChangeEmailModal'
import ChangePasswordModal from './components/modals/ChangePasswordModal'
import CloseAccountModal from './components/modals/CloseAccountModal'

import ChangeNameForm from './components/forms/ChangeNameForm'
import ChangeMatchSettingsForm from './components/forms/ChangeMatchSettingsForm'
import ChangeRoleForm from './components/forms/ChangeRoleForm'

import SignOutButton from './components/buttons/SignOutButton'

import './index.scss'

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

				.bx--label-description {
					font-size: small;
				}

				.bx--file-filename {
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

	margin-top: 10px;
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

	componentWillMount() {}

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
							<ToggleContent
								toggle={show => (
									<Button
										kind="secondary"
										className="manage_account_button"
										onClick={show}
									>
										Change Profile Picture
									</Button>
								)}
								content={hide => (
									<ChangeProfilePictureModal hide={hide} />
								)}
							/>
						</Container>
					</ProfilePictureWrapper>
					<ChangeNameForm />
					<ChangeMatchSettingsForm />
					<ChangeRoleForm />
					<ToggleContent
						toggle={show => (
							<Button
								kind="secondary"
								className="manage_account_button"
								onClick={show}
							>
								Change Email
							</Button>
						)}
						content={hide => (
							<ChangeEmailModal hide={hide} />
						)}
					/>
					<ToggleContent
						toggle={show => (
							<Button
								kind="secondary"
								className="manage_account_button"
								onClick={show}
							>
								Change Password
							</Button>
						)}
						content={hide => (
							<ChangePasswordModal hide={hide} />
						)}
					/>
					<SignOutButton />
					<ToggleContent
						toggle={show => (
							<Button
								kind="danger"
								className="manage_account_button"
								onClick={show}
							>
								Close Account
							</Button>
						)}
						content={hide => (
							<CloseAccountModal hide={hide} />
						)}
					/>
				</Wrapper>
				<MenuBar />
			</Layout>
		)
	}
}

export default compose(
	withEmailVerification,
	withAuthorization(authUser => !!authUser)
  )(AccountPage)
