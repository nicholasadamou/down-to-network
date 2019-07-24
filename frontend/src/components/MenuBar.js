import React from 'react'

import styled from 'styled-components'

import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

import Home20 from '@carbon/icons-react/es/home/20';
import ThumbsUp20 from '@carbon/icons-react/es/thumbs-up/20';
import Chat20 from '@carbon/icons-react/es/chat/20';
import User20 from '@carbon/icons-react/es/user/20';

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

		list-style-type: none;

		li {
			display: inline-block;

			padding: 15px;

			svg {
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
					<Link to={ROUTES.HOME}>
						<Home20 />
					</Link>
				</li>
				{/* <li>
					<Link to={ROUTES.LIKES}>
						<ThumbsUp20 />
					</Link>
				</li> */}
				<li>
					<Link to={ROUTES.CHAT}>
						<Chat20 />
					</Link>
				</li>
				<li>
					<Link to={ROUTES.ACCOUNT}>
						<User20 />
					</Link>
				</li>
			</ul>
		</Wrapper>
	)
}

export default MenuBar
