import React, { useContext } from 'react';

import  { FirebaseContext } from './Firebase';

const SomeComponent = () => {
	const { firebase } = useContext(FirebaseContext)

	return (
		<div>I've access to Firebase and render something.</div>
	);
};

export default SomeComponent;
