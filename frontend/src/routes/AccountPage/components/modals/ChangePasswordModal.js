/* eslint-disable no-unused-vars */
import React from 'react'

import { ModalHeader, ModalBody } from 'carbon-components-react'

import Modal from '../../../../components/Modal/Modal'
import ChangePasswordForm from '../forms/ChangePasswordForm'

const ChangePasswordModal = props => (
  <Modal hide={props.hide}>
    <ModalHeader />
    <ModalBody>
      <ChangePasswordForm />
    </ModalBody>
  </Modal>
)

export default ChangePasswordModal
