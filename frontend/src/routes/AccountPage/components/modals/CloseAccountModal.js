/* eslint-disable no-unused-vars */
import React from 'react'

import { ModalHeader, ModalBody } from 'carbon-components-react'

import Modal from '../../../../components/Modal/Modal'
import CloseAccountForm from '../forms/CloseAccountForm'

const CloseAccountModal = props => (
  <Modal hide={props.hide}>
    <ModalHeader />
    <ModalBody>
      <CloseAccountForm />
    </ModalBody>
  </Modal>
)

export default CloseAccountModal
