import React, { useEffect } from "react"
import { FormMessage } from "components/FormMessage"
import { useOvermind } from "store"
import { useToasts } from "react-toast-notifications"

import { IUser, IMessage, IRoom } from "interfaces"
import { socket } from "socket"
import { UsersList } from "components/UsersList"
import { Chat } from "components/Chat"
import { Divider } from "components/Divider"
import { action } from "overmind"

export const RoomPage = () => {
  const { state, actions } = useOvermind()
  const { addToast } = useToasts()

  useEffect(() => {
    socket.on("ROOM:NEW_USER", (data: IUser) => {
      console.log("new user", data)
      actions.addUserToRoom(data)
    })

    socket.on("ROOM:GET_MESSAGE", (data: IMessage) => {
      actions.getMessageToRoom(data)
    })

    socket.on("ROOM:DELETE_USER", (socketId: string) => {
      actions.deleteUserFromRoom(socketId)
    })

    return () => {
      socket.off("ROOM:NEW_USER")
      socket.off("ROOM:GET_MESSAGE")
      socket.off("ROOM:DELETE_USER")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = (message: string) => {
    if (message.trim()) {
      socket.emit("ROOM:SEND_MESSAGE", {
        roomId: state.curRoom.id,
        socketId: socket.id,
        text: message,
      })
    } else {
      addToast("Invalid message value. Type something!", {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  return (
    <>
      <div className="container mb-5">
        <h3 className="mt-2">{state.curRoom.name}</h3>
        <div className="row">
          <Divider />
          <div className="col-md">
            <h4>Users</h4>
            <UsersList users={state.curRoom.users} />
          </div>
          <div className="col-md-5 col-sm">
            <h4>Chat</h4>
            <Chat messages={state.curRoom.messages} />
          </div>
          <div className="col-md-5 col-sm">
            <h4>Heroes</h4>
          </div>
        </div>
      </div>
      <FormMessage sendMessage={sendMessage} inRoom />
    </>
  )
}
