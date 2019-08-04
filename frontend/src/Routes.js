import React, { lazy, Suspense, useContext } from 'react'

import {
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

import * as ROUTES from './constants/routes';

import { withFirebase } from './contexts/Firebase'
import AccountContext from './contexts/Account/AccountContext'

import Loading from './components/Loading'

const SignInPage = lazy(() => import('./routes/SignInPage/SignInPage'))
const SignUpPage = lazy(() => import('./routes/SignUpPage/SignUpPage'))
const DashboardPage = lazy(() => import('./routes/DashboardPage/DashboardPage'))
const ForgotPasswordPage = lazy(() => import('./routes/ForgotPasswordPage/ForgotPasswordPage'))
const AccountPage = lazy(() => import('./routes/AccountPage/AccountPage'))

const Routes = () => {
	const { doesUserExist } = useContext(AccountContext)

	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route exact path={ROUTES.LANDING} render={() => {
					if (!doesUserExist()) {
						return <Redirect to={ROUTES.SIGN_IN} />
					} else {
						return <Redirect to={ROUTES.DASHBOARD} />
					}
				}} />
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
						if (!doesUserExist()) {
							return <Redirect to={ROUTES.SIGN_IN} />
						} else {
							return <DashboardPage {...props} />
						}
					}}
				/>
				<Route exact path={ROUTES.ACCOUNT} render={props => {
						if (!doesUserExist()) {
							return <Redirect to={ROUTES.SIGN_IN} />
						} else {
							return <AccountPage {...props} />
						}
					}}
				/>
			</Switch>
		</Suspense>
	)
}

export default withFirebase(Routes)
