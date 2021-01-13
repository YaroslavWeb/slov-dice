import { Switch, Route, Redirect } from "react-router-dom"

import { ProtectedRoute } from "./ProtectedRoute"
import { SignUpPage } from "pages/SignUpPage"
import { PublicPage } from "pages/PublicPage"
import { RoomPage } from "pages/RoomPage"

export function Routing() {
  return (
    <Switch>
      <Route exact path="/sign-up" component={SignUpPage} />
      <ProtectedRoute path="/public" component={PublicPage} />
      <ProtectedRoute path="/rooms/:id" component={RoomPage} />
      <Redirect to="/sign-up" />
    </Switch>
  )
}
