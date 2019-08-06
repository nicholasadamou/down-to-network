import React from 'react'

import styled from 'styled-components'

import { Button } from 'carbon-components-react'

import * as ROUTES from '../../constants/routes';

const Wrapper = styled.div`
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	width: 100%;
	height: 100%;

	padding: 20px;

	overflow: hidden;

	@media (max-width: 375px) {
		align-items: flex-start;
		justify-content: flex-end;
	}

	strong {
		font-size: xx-large;
		line-height: 2;
		font-weight: bold;
	}

	p, em {
		font-size: x-large;
		line-height: 2;
	}

	em {
		font-style: italic;
	}

	button {
		margin-top: 20px;

		width: 18rem;

		font-size: large;

		@media (max-width: 375px) {
			width: 100%;
			max-width: 100%;
		}
	}
`

const NotFoundPage = () => (
    <Wrapper>
        <strong>
            404 Page Not Found
        </strong>
        <p>
            Whoops! <span role="img" aria-label="tired face">😫</span> Looks like the page you are looking for doesn't exist!
        </p>

        <Button
            kind="primary"
            onClick={() => {
                window.location.href = `${ROUTES.LANDING}`
            }}
        >
            Go back to landing page?
        </Button>
    </Wrapper>
)

export default NotFoundPage