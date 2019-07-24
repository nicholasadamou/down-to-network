/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

import { withFirebase } from '../../components/Firebase';

import ActionBar from './components/ActionBar'

import stephenAlt from '../../assets/stephen-alt.png'

const Wrapper = styled.div`
	display: flex;
    align-items: center;
	justify-content: center;

	height: 100%;

	text-align: center;

	img {
		width: 100%;
		height: 100%;

		margin-bottom: 10px;
	}

	h1 {
		font-size: xx-large;

		margin-bottom: 20px;
	}

	h3 {
		font-size: x-large;
		color: #54545454;

		margin-bottom: 10px;
	}
`

const BelowTheFold = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;

	width: 100%;

	padding: 10px;
	margin-bottom: 125px;


	h4 {
		font-size: x-large;
		font-weight: bold;

		margin-top: 10px;
	}

	p {
		margin-top: 10px;

		font-size: large;
		color: #54545454;
	}
`

class HomePage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			users: []
		}
	}

	componentWillMount() {
		this.props.firebase.users().on('value', snapshot => {
			const userObject = snapshot.val();

			if (userObject) {
				const userList = Object.keys(userObject).map(key => {
					return {
						...userObject[key],
						uid: key,
					}
				});

				this.setState({
					users: userList.filter(user => user.uid !== this.props.firebase.auth.currentUser.uid),
				}, () => console.log('users=', this.state.users));
			} else {
				this.setState({ users: null });
			}
		});
	}


	render() {
		return (
			<Layout>
				{this.state.users !== null ? (
					<Wrapper>
						{this.state.users.map(user => (
							<div key={user.uid} style={{ width: '100%' }}>
								<img src={stephenAlt} />
								<h1>{user.name}</h1>
								<h3>{user.role}</h3>
								<h3>{user.location}</h3>

								<BelowTheFold>
									<h4>Bio</h4>
									<p>{user.bio}</p>

									<h4>Education</h4>
									<p>{user.education}</p>

									<h4>Past Experiences</h4>
									<p>{user.experiences}</p>
								</BelowTheFold>
							</div>
						))}
					</Wrapper>
				) : (
					''
				)}
				<ActionBar />
				<MenuBar />
			</Layout>
		)
	}
}

export default withFirebase(HomePage)
