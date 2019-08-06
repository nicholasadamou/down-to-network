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

const ChangeProfilePicturePage = lazy(() => import('./routes/AccountPage/routes/ChangeProfilePicturePage'))
const CloseAccountPage = lazy(() => import('./routes/AccountPage/routes/CloseAccountPage'))
const ChangeEmailPage = lazy(() => import('./routes/AccountPage/routes/ChangeEmailPage'))
const ChangePasswordPage = lazy(() => import('./routes/AccountPage/routes/ChangePasswordPage'))

const NotFoundPage = lazy(() => import('./routes/NotFoundPage/NotFoundPage'))

const Routes = () => {
	const { doesUserExist } = useContext(AccountContext)

	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				{/* main pages */}
				<Route exact path={ROUTES.LANDING} render={() => {
					if (!doesUserExist()) {
						return <Redirect to={ROUTES.SIGN_IN} />
					} else {
						return <Redirect to={ROUTES.DASHBOARD} />
					}
				}} />
				<Route exact path={ROUTES.DASHBOARD} render={props => {
						return <DashboardPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.ACCOUNT} render={props => {
						return <AccountPage {...props} />
					}}
				/>

				{/* auth pages */}
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

				{/* account pages */}
				<Route exact path={ROUTES.CHANGE_PROFILE_PICTURE} render={props => {
						return <ChangeProfilePicturePage {...props} />
					}}
				/>
				<Route exact path={ROUTES.CHANGE_EMAIL} render={props => {
						return <ChangeEmailPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.CLOSE_ACCOUNT} render={props => {
						return <CloseAccountPage {...props} />
					}}
				/>
				<Route exact path={ROUTES.CHANGE_PASSWORD} render={props => {
						return <ChangePasswordPage {...props} />
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
