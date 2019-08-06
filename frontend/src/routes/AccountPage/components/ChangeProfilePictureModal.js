import React from 'react'

import { ModalHeader, ModalBody } from 'carbon-components-react'

import Modal from '../../../components/Modal/Modal'
import ChangeProfilePictureForm from '../components/ChangeProfilePictureForm'

const ChangeProfilePicturePage = props => (
    <Modal hide={props.hide}>
        <ModalHeader />
        <ModalBody>
            <ChangeProfilePictureForm />
        </ModalBody>
    </Modal>
)

export default ChangeProfilePicturePage