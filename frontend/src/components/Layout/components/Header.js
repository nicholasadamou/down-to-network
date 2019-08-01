import React from 'react';

import { Header as CarbonHeader, HeaderName } from 'carbon-components-react'

const Header = () => {
	return (
		<CarbonHeader aria-label="DTN">
			<HeaderName href="/">
				Down To Network?
			</HeaderName>
		</CarbonHeader>
	);
};

export default Header;

