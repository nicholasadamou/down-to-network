/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

import AccountContext from '../../contexts/Account/AccountContext'

import Loading from '../Loading'

import Header from './components/Header'

const Layout = props => {
  const { children } = props
  const { loading } = useContext(AccountContext)

  return (
		<>
			{ loading
			  ?	(
			    <Loading />
			  ) : (
				<>
					<Header />
					{ children }
				</>
			  )
			}
		</>
  )
}

export default Layout
