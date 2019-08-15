/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React from 'react'

import styled from 'styled-components'

import * as ROUTES from '../constants/routes'

import Home20 from '@carbon/icons-react/es/home/20'
import User20 from '@carbon/icons-react/es/user/20'
import Checkmark20 from '@carbon/icons-react/es/checkmark/20'

const Wrapper = styled.div`
	position: fixed;
	bottom: 0;

	width: 100%;
	height: 6vh;

	background-color: #0061ff;

	ul {
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 100%;

		list-style-type: none;

		li {
			display: flex;
			align-items: center;

			height: 100%;

			padding: 20px;

			line-height: 0;

			svg {
				width: 20px;
				height: 20px;

				fill: white;
			}

			&:hover {
				cursor: pointer;

				background-color: #2579ff;
			}
		}
	}
`

const MenuBar = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <button onClick={() => {
            window.location.href = `${ROUTES.DASHBOARD}`
          }}>
            <Home20 />
          </button>
        </li>
        <li>
          <button onClick={() => {
            window.location.href = `${ROUTES.MATCHES}`
          }}>
            <Checkmark20 />
          </button>
        </li>
        <li>
          <button onClick={() => {
            window.location.href = `${ROUTES.ACCOUNT}`
          }}>
            <User20 />
          </button>
        </li>
      </ul>
    </Wrapper>
  )
}

export default MenuBar
