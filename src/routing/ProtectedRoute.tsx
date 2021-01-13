import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

import { useOvermind } from "store"

export function ProtectedRoute({ component, ...args }: RouteProps) {
  const { state } = useOvermind()

  return state.isAuth ? (
    <Route component={component} {...args} />
  ) : (
    <Redirect to="/sign-up" />
  )
}
