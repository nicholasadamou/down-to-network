import React, { lazy, Suspense } from 'react'

import {
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

import * as ROUTES from './constants/routes';

import Loading from './components/Loading'

const SignInPage = lazy(() => import('./routes/SignInPage/SignInPage'))
const SignUpPage = lazy(() => import('./routes/SignUpPage/SignUpPage'))
const DashboardPage = lazy(() => import('./routes/DashboardPage/DashboardPage'))
const ForgotPasswordPage = lazy(() => import('./routes/ForgotPasswordPage/ForgotPasswordPage'))

const Routes = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route exact path={ROUTES.LANDING} render={() => <Redirect to={ROUTES.SIGN_IN} />} />
				<Route exact path={ROUTES.SIGN_IN} render={props => {
						return <SignInPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.PASSWORD_FORGET} render={props => {
						return <ForgotPasswordPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.SIGN_UP} render={props => {
						return <SignUpPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.DASHBOARD} render={props => {
						return <DashboardPage {...props} />
					}}
				/>
			</Switch>
		</Suspense>
	)
}

export default Routes
