import React from "react"
import { block } from "bem-cn"

import "./styles.scss"

const BEM = block("divider")

interface DividerProps {
  height?: number
}

export const Divider = ({ height = 2 }: DividerProps) => {
  return <div className={BEM()} style={{ height }} />
}
