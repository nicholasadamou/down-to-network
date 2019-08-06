import React from 'react'

import styled from 'styled-components'

import { Button, SkeletonPlaceholder, SkeletonText } from 'carbon-components-react'

import * as ROUTES from '../../constants/routes'

import AccountContext from '../../contexts/Account/AccountContext'

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

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

		button {
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
`

const ProfilePictureWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

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

	div {
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

		button {
			padding: 0;
    		margin: 0;

			font-weight: bold;
			font-size: small;
			color: #0061ff;

			border: none;
			outline: none;

			&:hover {
				text-decoration: underline;

				cursor: pointer;
			}
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
						<div>
							{
								loading
									?
										<SkeletonText style={{ width: '35%' }} />
									:
										<p>{account.name}</p>
							}
							<button 
								onClick={() => {
									window.location.href = `${ROUTES.CHANGE_PROFILE_PICTURE}`
								}}
							>
								Change Profile Picture
							</button>
						</div>
					</ProfilePictureWrapper>
					<ChangeMatchSettingsForm />
					<ChangeRoleForm />
					<Button 
						kind="secondary"
						onClick={() => {
							window.location.href = `${ROUTES.CHANGE_EMAIL}`
						}}
					>
						Change Email
					</Button>
					<Button 
						kind="secondary"
						onClick={() => {
							window.location.href = `${ROUTES.CHANGE_PASSWORD}`
						}}
					>
						Change Password
					</Button>
					<SignOutButton />
					<Button 
						kind="danger"
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
