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
const EmailVerificationPage = lazy(() => import('./routes/EmailVerificationPage/EmailVerificationPage'))
const NotFoundPage = lazy(() => import('./routes/NotFoundPage/NotFoundPage'))

const Routes = () => {
	const { isAuthenticated } = useContext(AccountContext)

	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				{/* main pages */}
				<Route exact path={ROUTES.LANDING} render={() => {
					return !isAuthenticated()
						? <Redirect to={ROUTES.SIGN_IN} />
						: <Redirect to={ROUTES.DASHBOARD} />
				}} />
				<Route exact path={ROUTES.DASHBOARD} render={props => {
						return isAuthenticated()
							? <DashboardPage {...props} />
							: <Redirect to={ROUTES.LANDING} />
					}}
				/>
				<Route exact path={ROUTES.ACCOUNT} render={props => {
						return isAuthenticated()
							? <AccountPage {...props} />
							: <Redirect to={ROUTES.LANDING} />
					}}
				/>

				{/* auth pages */}
				<Route exact path={ROUTES.SIGN_IN} render={props => {
						return !isAuthenticated()
							? <SignInPage {...props} />
							: <Redirect to={ROUTES.LANDING} />
					}}
				/>
				<Route exact path={ROUTES.PASSWORD_FORGET} render={props => {
						return !isAuthenticated()
							? <ForgotPasswordPage {...props} />
							: <Redirect to={ROUTES.LANDING} />
					}}
				/>
				<Route exact path={ROUTES.SIGN_UP} render={props => {
						return !isAuthenticated()
							? <SignUpPage {...props} />
							: <Redirect to={ROUTES.LANDING} />
					}}
				/>
				<Route exact path={ROUTES.VERIFY_EMAIL} render={props => {
						return <EmailVerificationPage {...props} />
					}}
				/>

				{/* 404 page */}
				<Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
				<Redirect from='*' to={ROUTES.NOT_FOUND} />
			</Switch>
		</Suspense>
	)
}

export default withFirebase(Routes)
