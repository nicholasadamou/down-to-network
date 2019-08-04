import React, { useContext } from 'react'

import { Button } from 'carbon-components-react'

import AccountContext from '../../../contexts/Account/AccountContext'

const CloseAccountButton = () => {
    const { handleCloseAccount } = useContext(AccountContext)

    return (
        <Button kind="danger" onClick={handleCloseAccount}>
            Close Account
        </Button>
    )
}

export default CloseAccountButton