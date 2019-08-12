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
const MatchesPage = lazy(() => import('./routes/MatchesPage/MatchesPage'))
const ForgotPasswordPage = lazy(() => import('./routes/ForgotPasswordPage/ForgotPasswordPage'))
const AccountPage = lazy(() => import('./routes/AccountPage/AccountPage'))
const NotFoundPage = lazy(() => import('./routes/NotFoundPage/NotFoundPage'))

const Routes = () => {
	const { isAuthenticated } = useContext(AccountContext)

	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				{/* main pages */}
				<Route exact path={ROUTES.LANDING} render={props => {
					return !isAuthenticated()
						? <Redirect to={ROUTES.SIGN_IN} />
						: <DashboardPage {...props} />
				}} />
				<Route exact path={ROUTES.DASHBOARD} render={props => {
						return isAuthenticated()
							? <DashboardPage {...props} />
							: <SignInPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.MATCHES} render={props => {
						return isAuthenticated()
							? <MatchesPage {...props} />
							: <SignInPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.ACCOUNT} render={props => {
						return isAuthenticated()
							? <AccountPage {...props} />
							: <SignInPage {...props} />
					}}
				/>

				{/* auth pages */}
				<Route exact path={ROUTES.SIGN_IN} render={props => {
						return !isAuthenticated()
							? <SignInPage {...props} />
							: <DashboardPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.PASSWORD_FORGET} render={props => {
						return !isAuthenticated()
							? <ForgotPasswordPage {...props} />
							: <DashboardPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.SIGN_UP} render={props => {
						return !isAuthenticated()
							? <SignUpPage {...props} />
							: <DashboardPage {...props} />
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
