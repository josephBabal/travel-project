import React from 'react'
import ReactDOM from 'react-dom/client'
import'./styles/style.css'
import App from './App'


// import { store2 } from './redux/store2'
import  store  from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store} >
    <App />
  </Provider>
)