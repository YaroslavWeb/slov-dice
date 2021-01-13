import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useToasts } from "react-toast-notifications"
import axios from "axios"

import { socket } from "socket"
import { useOvermind } from "store"
import { Button } from "components/Button"

export function SignUpPage() {
  const history = useHistory()
  const { addToast } = useToasts()
  const { state, actions } = useOvermind()

  const [nickname, setNickname] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (state.isAuth) history.replace("/public")
  }, [state.isAuth, history])

  const handleClick = () => {
    setLoading(true)
    if (nickname.trim()) {
      axios.post("/register", { nickname, socketId: socket.id }).then((res) => {
        socket.emit("REG_USER", socket.id)
        actions.register(res.data)
      })
    } else {
      addToast("Invalid nickname value. Type another.", {
        appearance: "error",
        autoDismiss: true,
      })
    }
    setLoading(false)
  }

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="border rounded shadow p-3 p-md-5">
        <h2 className="text-center">Slov Dice</h2>
        <div className="form-group my-3">
          <label htmlFor="inputNickname">Nickname</label>
          <input
            className="form-control"
            type="text"
            id="inputNickname"
            maxLength={12}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <small className="form-text text-muted">
            The nickname will be displayed in the application.
          </small>
        </div>
        <Button
          label="ENTER"
          fullWidth
          disabled={isLoading}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
