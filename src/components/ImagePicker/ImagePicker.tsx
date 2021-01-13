import React from "react"
import { getAvatars } from "../../assets/images/heroes/getAvatars"

export const ImagePicker = () => {
  return (
    <div>
      <img alt="avatar" src={getAvatars[0]} />
    </div>
  )
}
