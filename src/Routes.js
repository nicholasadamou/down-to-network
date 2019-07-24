import React, { lazy, Suspense } from 'react'

import {
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

import * as ROUTES from './constants/routes';

import Loading from './components/Loading'

const LandingPage = lazy(() => import('./routes/LandingPage/LandingPage'))
const SignInPage = lazy(() => import('./routes/SignInPage/SignInPage'))
const SignUpPage = lazy(() => import('./routes/SignUpPage/SignUpPage'))
const HomePage = lazy(() => import('./routes/HomePage/HomePage'))
const LikesPage = lazy(() => import('./routes/LikesPage'))
const ChatPage = lazy(() => import('./routes/ChatPage'))
const AccountPage = lazy(() => import('./routes/AccountsPage/AccountPage'))


const Routes = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route exact path={ROUTES.LANDING} render={props => {
						return <LandingPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.SIGN_IN} render={props => {
						return <SignInPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.SIGN_UP} render={props => {
						return <SignUpPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.HOME} render={props => {
						return <HomePage {...props} />
					}}
				/>
				<Route exact path={ROUTES.LIKES} render={props => {
						return <LikesPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.CHAT} render={props => {
						return <ChatPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.ACCOUNT} render={props => {
						return <AccountPage {...props} />
					}}
				/>
			</Switch>
		</Suspense>
	)
}

export default Routes
