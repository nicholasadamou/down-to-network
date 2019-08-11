/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import { compose } from 'recompose'

// import styled from 'styled-components'

import { withAuthorization, withEmailVerification } from '../../contexts/Session'

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

class MatchesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentWillMount () {}

  render () {
    return (
      <Layout>
        <MenuBar />
      </Layout>
    )
  }
}

export default compose(
  withEmailVerification,
  withAuthorization(authUser => !!authUser)
)(MatchesPage)
