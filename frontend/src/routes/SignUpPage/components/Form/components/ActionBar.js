/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	position: absolute;
	bottom: 0;
	left: 0;

	width: 100%;
	height: 6vh;

	padding: 20px;

	background-color: #0061ff;

	a {
		text-decoration: none;

		font-size: larger;
		color: white;

		&:hover {
			text-decoration: none;
			cursor: pointer;
		}
	}
`

const ActionBar = props => {
	const { back, next, backTextLabel, nextTextLabel } = props

	return (
		<Wrapper>
			<a onClick={back}>{backTextLabel}</a>
			<a onClick={next}>{nextTextLabel}</a>
		</Wrapper>
	)
}

export default ActionBar
