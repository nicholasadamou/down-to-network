import React from 'react'

import Layout from '../../../components/Layout/Layout'
import MenuBar from '../../../components/MenuBar'

import CloseAccountForm from '../components/forms/CloseAccountForm'

const CloseAccountPage = props => (
    <Layout>
        <CloseAccountForm />
        <MenuBar />
    </Layout>
)

export default CloseAccountPage