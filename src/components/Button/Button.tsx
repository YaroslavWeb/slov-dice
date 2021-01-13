import React from "react"
import { block } from "bem-cn"

import "./styles.scss"

const BEM = block("button")

interface ButtonProps {
  label: string
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({
  label,
  fullWidth,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={BEM({ fullWidth })}
    >
      {label}
    </button>
  )
}
