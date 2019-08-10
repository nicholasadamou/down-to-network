/* eslint-disable no-unused-vars */
import React from 'react'

import { ModalHeader, ModalBody } from 'carbon-components-react'

import Modal from '../../../../components/Modal/Modal'
import ChangeEmailForm from '../forms/ChangeEmailForm'

const ChangeEmailModal = props => (
  <Modal hide={props.hide}>
    <ModalHeader />
    <ModalBody>
      <ChangeEmailForm />
    </ModalBody>
  </Modal>
)

export default ChangeEmailModal
