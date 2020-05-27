/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import Firebase, { FirebaseContext } from './contexts/Firebase'

const root = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
);

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(root(), div)
  ReactDOM.unmountComponentAtNode(div)
})
