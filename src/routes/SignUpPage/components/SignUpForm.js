import React from 'react'

import styled from 'styled-components'

import { compose } from 'recompose';

import { withRouter } from 'react-router-dom'

import { TextInput, TextArea, Button } from 'carbon-components-react'

import { withFirebase } from '../../../components/Firebase';

import * as ROUTES from '../../../constants/routes'

import MultiSelect from '../components/MultiSelect/MultiSelect'

import ImageUploader from 'react-images-upload';

const { PasswordInput } = TextInput

const INITIAL_STATE = {
	email: '',
	passwordOne: '',
	passwordTwo: '',
	name: '',
	role: '',
	education: '',
	location: '',
	bio: '',
	experiences: '',
	fun_facts: '',
	error: null,
  };

const Error = styled.p`
	width: 100%;

	padding-top: 10px;
	margin: 10px 0;

	text-align: left;
    line-height: 26px;
`

class SignUpFormBase extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			...INITIAL_STATE,
			avatar: null
		}

		this.onDrop = this.onDrop.bind(this);
	}

	onDrop = image => {
		this.setState({
            avatar: image[0],
		}, () => console.log('avatar=', this.state.avatar));
	}

	handleSubmit = event => {
		const { avatar, email, passwordOne, name, role, education, location, bio, experiences, fun_facts } = this.state;

		this.props.firebase
		  .doCreateUserWithEmailAndPassword(email, passwordOne)
		  .then(authUser => {
			this.setState({ ...INITIAL_STATE });

			console.log(authUser)

			let storageRef = this.props.firebase.app.storage().ref(authUser + '/profilePicture/' + avatar.name);
			storageRef.put(avatar);

			this.props.firebase.db.ref(`users/${authUser.user.uid}`).set({
				avatar,
				name,
				role,
				education,
				location,
				bio,
				experiences,
				fun_facts
			})

			this.props.history.push(ROUTES.HOME)
		  })
		  .catch(error => {
			this.setState({ error });
		  });

		event.preventDefault();
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	  };

	render() {
		const {
			avatar,
			email,
			passwordOne,
			passwordTwo,
			name,
			role,
			location,
			education,
			bio,
			experiences,
			fun_facts,
			error,
		  } = this.state;

		  const isInvalid =
				passwordOne !== passwordTwo ||
				passwordOne === '' ||
				email === '' || role === ''
				|| name === '' || location === '' ||
				education === '' || bio === '' || avatar === {}
				|| experiences === '' || fun_facts === '';

		console.log(this.props.firebase)

		return (
			<form onSubmit={this.handleSubmit}>
				<ImageUploader
                	withIcon={true}
                	buttonText='Choose Avatar'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', 'jpeg', '.gif', '.png', '.gif']}
                	maxFileSize={5242880}
            	/>
				<TextInput
						id="email"
						name="email"
						labelText="Email"
						type="email"
						placeholder="Stephen.Alt@ibm.com"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<PasswordInput
						id="passwordOne"
						name="passwordOne"
						labelText="Password"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<PasswordInput
						id="passwordTwo"
						name="passwordTwo"
						labelText="Re-enter Password"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextInput
						id="name"
						name="name"
						labelText="Name"
						type="text"
						placeholder="Stephen Alt"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextInput
						id="role"
						name="role"
						labelText="Role"
						type="text"
						placeholder="Software Engineering Intern"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextInput
						id="education"
						name="education"
						labelText="Education"
						type="text"
						placeholder="Northeastern University"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextInput
						id="location"
						name="location"
						labelText="Location"
						type="text"
						placeholder="North Castle"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextArea
						id="bio"
						name="bio"
						labelText="Bio"
						type="text"
						placeholder="I'm too cool to come to the hackation."
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextInput
						id="experiences"
						name="experiences"
						labelText="Experiences"
						type="text"
						placeholder="IBM Research"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					<TextInput
						id="fun_facts"
						name="fun_facts"
						labelText="Fun Facts"
						type="text"
						placeholder="IBM Research"
						hideLabel={false}
						onBlur={this.onChange}
					/>
					{/* <MultiSelect /> */}
					<Button
						className="signup__submit-btn"
						kind="primary"
						type="submit"
						disabled={isInvalid}
					>
						Sign Up
					</Button>

					{error && <Error>⚠️ {error.message}</Error>}
				</form>
		)
	}
}

const SignUpForm = compose(withRouter(withFirebase(SignUpFormBase)));

export default SignUpForm
