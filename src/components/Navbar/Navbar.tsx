import React from "react"
import { useOvermind } from "store"
import { Link } from "react-router-dom"

import { ReactComponent as LogoIcon } from "assets/svg/logo.svg"

export const Navbar = () => {
  const { state } = useOvermind()

  return (
    <nav className="navbar">
      <div>
        <span className="logo">
          <LogoIcon />
        </span>
        Slov Dice
      </div>
      {state.isAuth ? (
        <div>
          <span>{state.user.nickname}</span>
        </div>
      ) : (
        <Link to="/sign-up">Sign In</Link>
      )}
    </nav>
  )
}
