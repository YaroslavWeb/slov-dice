import { useEffect, useRef } from "react"
import { block } from "bem-cn"

import { IMessage } from "interfaces"
import { socket } from "socket"

import "./styles.scss"

const BEM = block("chat")

interface ChatProps {
  messages: IMessage[]
}

export const Chat = ({ messages }: ChatProps) => {
  const chatRef = useRef(null)

  useEffect(() => {
    chatRef.current.scrollTo(0, 99999)
  }, [messages])

  return (
    <div className={BEM()} ref={chatRef}>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            className={BEM("message").mix(["mb-2", "p-2", "rounded"])}
            key={message.id}
          >
            <span
              className={BEM("nickname", {
                me: message.socketId === socket.id,
              })}
            >
              {message.nickname}:
            </span>
            <span className={BEM("text").mix("ml-1")}>{message.text}</span>
          </div>
        ))
      ) : (
        <span>No message yet</span>
      )}
    </div>
  )
}
