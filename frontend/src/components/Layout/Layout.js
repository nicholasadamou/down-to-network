/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React from 'react'

import Header from './components/Header'

const Layout = props => {
  const { children } = props
  return (
		<>
			<Header />
			{ children }
		</>
  )
}

export default Layout
