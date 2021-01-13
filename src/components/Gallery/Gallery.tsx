import React from "react"
import { getAvatars } from "../../assets/images/heroes/getAvatars"

export const Gallery = () => {
  return (
    <div className="row">
      {getAvatars.examples.map((path: string) => (
        <div className="col-sm-6 col-md-4 col-xl-3 m-1" key={path}>
          <img alt="avatar" src={path} />
        </div>
      ))}
    </div>
  )
}
