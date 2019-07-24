import React from 'react';

import { Header as CarbonHeader, HeaderName } from 'carbon-components-react'

const Header = () => {
	return (
		<CarbonHeader aria-label="DTN">
			<HeaderName href="/">
				DTN
			</HeaderName>
		</CarbonHeader>
	);
};

export default Header;

