/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import { compose } from 'recompose'

import styled from 'styled-components'

import { withAuthorization, withEmailVerification } from '../../contexts/Session'
import AccountContext from '../../contexts/Account/AccountContext';

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'
import Loading from '../../components/Loading'

const NoMatchesWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;

	width: 100%;
	height: 100%;

	padding: 10px;
	padding-left: 20px;

	h1 {
		margin-bottom: 10px;

		font-size: large;
		font-weight: bold;
	}

	p {
		line-height: 2;

		em {
			font-style: italic;
		}
	}
`

class MatchesPage extends Component {
	static contextType = AccountContext

  constructor (props) {
    super(props)

    this.state = {
      matches: [],
      loading: true
    }
  }

  componentWillMount () {
    const { firebase } = this.props
    const { user } = this.context
    console.log(user)

    firebase.matches(user.uid).then(matches => {
      this.setState({
        matches,
        loading: false
      }, () => console.log('matches=', this.state.matches))
    }).catch(error => {
			this.setState({
				error: {
					error: true,
					message: error.message
				},
				loading: false
			}, () => console.log('error=', this.state.error))
		})
  }

  render () {
    const { matches, loading } = this.state

    return (
      <Layout>
        {
          loading ? (
            <Loading />
          ) : (
            matches.length > 0 ? (
              ''
            ) : (
              <NoMatchesWrapper>
                <h1>You don't have any matches. <span role="img" aria-label="crying face">😢</span></h1>
                <p>Get match'n by swiping <em>left</em> or <em>right</em> on users on the dashboard page.</p>
              </NoMatchesWrapper>
            )
          )
        }
        <MenuBar />
      </Layout>
    )
  }
}

export default compose(
  withEmailVerification,
  withAuthorization(authUser => !!authUser)
)(MatchesPage)
