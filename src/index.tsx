import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import * as serviceWorker from "./serviceWorker"

declare module "react" {
  interface HTMLAttributes<T> {
    css?: any
  }
}

// document.documentElement.style.setProperty(
//   "--vh",
//   `${window.innerHeight * 0.01}px`
// )

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
