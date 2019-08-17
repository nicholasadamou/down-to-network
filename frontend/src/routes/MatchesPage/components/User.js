/* eslint-disable no-mixed-spaces-and-tabs */
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
	margin-bottom: 10px;

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
		height: 80px;

		object-fit: cover;

		border-radius: 50%;
	}

	div {
		display: flex;
		flex-direction: column;

		margin-left: 10px;

		font-size: small;

		strong {
			margin-bottom: 10px;

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
          <div>
            <strong>{user.name}</strong>
            <em>{user.role}</em>
		  </div>
        </UserDetails>

        <a href={`mailto:${user.email}`}>Email</a>
      </UserContainer>
    </UsersWrapper>
  )
}

export default User
