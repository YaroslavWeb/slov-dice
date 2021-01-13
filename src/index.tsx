import React from "react"
import ReactDOM from "react-dom"
import { createOvermind } from "overmind"
import { Provider } from "overmind-react"
import { config } from "store"
import { ToastProvider } from "react-toast-notifications"

import App from "./App"

import "assets/styles/main.scss"

const overmind = createOvermind(config)

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <ToastProvider placement="top-right">
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
