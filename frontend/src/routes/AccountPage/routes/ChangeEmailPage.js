import React from 'react'

import Layout from '../../../components/Layout/Layout'
import MenuBar from '../../../components/MenuBar'

import ChangeEmailForm from '../components/forms/ChangeEmailForm'

const ChangeEmailPage = props => (
    <Layout>
        <ChangeEmailForm />
        <MenuBar />
    </Layout>
)

export default ChangeEmailPage