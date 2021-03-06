import React from "react"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import { render } from "react-dom"
import { Provider } from "react-redux"

const rootElement = document.getElementById("root")

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
