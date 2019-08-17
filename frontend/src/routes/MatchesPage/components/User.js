/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import React from 'react'

import styled from 'styled-components'

const UsersWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 90%;

	padding: 10px;
	margin: 0 auto;

	background-color: whitesmoke;
`

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	a {
		text-decoration: none;

		color: #0061ff;
	}
`

const UserDetails = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;

	img {
		width: 80px;
		border-radius: 100%;
	}

	span {
		margin-left: 10px;

		font-size: small;

		strong {
			font-weight: bold;
		}

		em {
			font-style: italic;
		}
	}
`

const User = props => {
  const { user } = props

  return (
    <UsersWrapper>
      <UserContainer>
        <UserDetails>
          <img src={user.profilePicture} alt={user.name} />
          <span><strong>{user.name}</strong> / <em>{user.role}</em></span>
        </UserDetails>

        <a href={`mailto:${user.email}`}>Email</a>
      </UserContainer>
    </UsersWrapper>
  )
}

export default User
