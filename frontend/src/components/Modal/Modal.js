/* eslint-disable no-unused-vars */
import React from 'react'

import { ComposedModal } from 'carbon-components-react'

const Modal = ({ hide, children }) => (
  <ComposedModal open onClose={hide}>
    {children}
  </ComposedModal>
)

export default Modal
