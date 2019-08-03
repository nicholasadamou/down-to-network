import React, { useContext } from 'react'

import AccountContext from '../../../contexts/Account/AccountContext'

const SignOutButton = () => {
    const { handleSignOut } = useContext(Context)

    return (
        <Button kind="primary" onClick={handleSignOut}>
            Sign Out
        </Button>
    )
}

export default SignOutButton