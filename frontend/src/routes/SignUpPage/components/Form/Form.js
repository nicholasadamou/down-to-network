import React, { Component } from 'react';

import { compose } from 'recompose';

import { withRouter } from 'react-router-dom'

import UserDetails from './components/UserDetails'
import PersonalDetails from './components/PersonalDetails'
import MatchSettings from './components/MatchSettings'

class FormBase extends Component {
	constructor(props) {
		super(props)

		this.state = {
			step: 1,
			error: ''
		}

		this.nextStep = this.nextStep.bind(this)
		this.prevStep = this.prevStep.bind(this)
	}

	nextStep = () => {
        const { step } = this.state

        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state

        this.setState({
            step : step - 1
        })
    }

	render() {
		const { step } = this.state

		switch(step) {
				case 1:
					return (
						<UserDetails
							nextStep={this.nextStep}
						/>
					)
				case 2:
					return (
						<PersonalDetails
							nextStep={this.nextStep}
							prevStep={this.prevStep}
						/>
					)
				case 3:
					return (
						<MatchSettings
							nextStep={this.nextStep}
							prevStep={this.prevStep}
						/>
					)
				default:
					return ''
			}
	}
}

const Form = compose(withRouter(FormBase));

export default Form
