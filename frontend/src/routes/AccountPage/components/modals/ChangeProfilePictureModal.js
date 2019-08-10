/* eslint-disable no-unused-vars */
import React from 'react'

import { ModalHeader, ModalBody } from 'carbon-components-react'

import Modal from '../../../../components/Modal/Modal'
import ChangeProfilePictureForm from '../forms/ChangeProfilePictureForm'

const ChangeProfilePictureModal = props => (
  <Modal hide={props.hide}>
    <ModalHeader />
    <ModalBody>
      <ChangeProfilePictureForm />
    </ModalBody>
  </Modal>
)

export default ChangeProfilePictureModal
