import React from 'react'

import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress'

const ProgressWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`

const Loading = () => (
	<ProgressWrapper>
		<CircularProgress style={{color: '#0061ff' }} />
	</ProgressWrapper>
)

export default Loading
