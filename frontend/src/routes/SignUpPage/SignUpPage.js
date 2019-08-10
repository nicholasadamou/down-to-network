/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React from 'react'

import { withRouter } from 'react-router-dom'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'
import Form from './components/Form/Form'

import './index.scss'

const Wrapper = styled.div`
	padding: 10px;

	height: 100%;

	overflow-x: hidden;

	h1 {
		margin-bottom: 20px;

		font-size: larger;
		font-weight: bold;

		text-align: left;
	}
`

const SignUpPage = props => {
  return (
    <Layout>
      <Wrapper>
        <Form />
      </Wrapper>
    </Layout>
  )
}

export default withRouter(SignUpPage)
