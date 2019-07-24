import React from 'react'

import styled from 'styled-components'

import Checkmark from '@carbon/icons-react/es/checkmark/20';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	position: fixed;
	bottom: 65px;

    width: 100%;

	padding: 0 20px;
`

const Like = styled.div`
	border-radius: 100%;
	background-color: #0061ff;

	svg {
		fill: white;

		width: 45px;
		height: 45px;
	}
`

const Dislike = styled.div`
	border-radius: 100%;
	background-color: #d92026;

	h1 {
		width: 45px;
		height: 45px;

		padding-top: 5px;

		text-align: center;

		font-size: xx-large;
		color: white;
	}
`

const ActionBar = () => (
	<Wrapper>
		<Dislike>
			<h1>!</h1>
		</Dislike>
		<Like>
			<Checkmark />
		</Like>
	</Wrapper>
)

export default ActionBar
