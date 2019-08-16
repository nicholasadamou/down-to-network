/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React from 'react'

import * as ROUTES from '../../../../constants/routes'

import { Header as CarbonHeader, HeaderName } from 'carbon-components-react'

import './index.scss'

const Header = () => {
  return (
    <CarbonHeader aria-label="DTN">
      <HeaderName href={ROUTES.DASHBOARD}>
		Down To Network?
      </HeaderName>
    </CarbonHeader>
  )
}

export default Header
