/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

import { Button } from 'carbon-components-react'

import AccountContext from '../../../../contexts/Account/AccountContext'

const SignOutButton = () => {
  const { handleSignOut } = useContext(AccountContext)

  return (
    <Button kind="primary" onClick={handleSignOut}>
            Sign Out
    </Button>
  )
}

export default SignOutButton
