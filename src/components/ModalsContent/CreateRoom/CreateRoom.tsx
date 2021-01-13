import React, { useState } from "react"
import { useToasts } from "react-toast-notifications"
import { useOvermind } from "store"

import { socket } from "socket"
import { Button } from "components/Button"

export const CreateRoom = () => {
  const { state } = useOvermind()
  const { addToast } = useToasts()

  const [name, setName] = useState<string>(`${state.user.nickname}'s room`)
  const [size, setSize] = useState<number>(2)

  const createRoom = () => {
    if (name.trim()) {
      if (size <= 12 && size >= 2) {
        socket.emit("CREATOR_JOIN_ROOM", { name, size })
      } else {
        addToast("Max size room 12 and min size 2.", {
          appearance: "error",
          autoDismiss: true,
        })
      }
    } else {
      addToast("Invalid name room value. Type another.", {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  return (
    <form>
      <div className="form-group">
        <label>Room name</label>
        <input
          className="form-control"
          value={name}
          type="text"
          maxLength={12}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Players</label>
        <input
          className="form-control"
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>
      <Button label="CREATE" fullWidth onClick={createRoom} />
    </form>
  )
}
