import { useState } from "react"
import { block } from "bem-cn"

import { Button } from "components/Button"

import "./styles.scss"

const BEM = block("form-message")

interface FormMessageProps {
  sendMessage: (message: string) => void
  inRoom?: boolean
}

export const FormMessage = ({ inRoom, sendMessage }: FormMessageProps) => {
  const [message, setMessage] = useState<string>("")

  const handleClick = () => {
    sendMessage(message)
    setMessage("")
  }

  const handleDice = () => {
    setMessage("/d20")
  }

  return (
    <form className={BEM()}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder={inRoom ? "/d8,12,20,24" : ""}
      />
      <Button label="SEND" onClick={handleClick} />
      {inRoom && <Button label="D20" onClick={handleDice} />}
    </form>
  )
}
