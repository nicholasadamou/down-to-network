import React from 'react'

import Layout from '../../../components/Layout/Layout'
import MenuBar from '../../../components/MenuBar'

import ChangeProfilePictureForm from '../components/forms/ChangeProfilePictureForm'

const ChangeProfilePicturePage = props => (
    <Layout>
        <ChangeProfilePictureForm />
        <MenuBar />
    </Layout>
)

export default ChangeProfilePicturePage