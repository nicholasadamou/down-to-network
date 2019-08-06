import React from 'react'

import Layout from '../../../components/Layout/Layout'
import MenuBar from '../../../components/MenuBar'

import ChangePasswordForm from '../components/forms/ChangePasswordForm'

const ChangePasswordPage = props => (
    <Layout>
        <ChangePasswordForm />
        <MenuBar />
    </Layout>
)

export default ChangePasswordPage