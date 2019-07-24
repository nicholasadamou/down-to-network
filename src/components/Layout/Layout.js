import React, { useContext } from 'react';

import  { FirebaseContext } from '../Firebase';

import Header from './components/Header'

const Layout = props => {
	const { children } = props
	const { firebase } = useContext(FirebaseContext)

	return (
		<>
			<Header />
			{ children }
		</>
	);
};

export default Layout;
