import React, { useState, useEffect } from "react"
import { useToasts } from "react-toast-notifications"
import { useHistory } from "react-router-dom"
import { useOvermind } from "store"
import axios from "axios"

import { socket } from "socket"
import { IUser, IMessage, IRoom } from "interfaces"
import { UsersList } from "components/UsersList"
import { Chat } from "components/Chat"
import { RoomsList } from "components/RoomsList"
import { FormMessage } from "components/FormMessage"
import { Divider } from "components/Divider"

export function PublicPage() {
  const history = useHistory()
  const { actions } = useOvermind()
  const { addToast } = useToasts()

  const [users, setUsers] = useState<IUser[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [rooms, setRooms] = useState<IRoom[]>([])

  useEffect(() => {
    axios.post("/public").then((res) => {
      setUsers(res.data.users)
      setMessages(res.data.publicChat)
      setRooms(res.data.rooms)
    })

    socket.on("ADD_USER", (data: IUser) => {
      console.log("user added", data)
      setUsers((prev) => [...prev, data])
    })

    socket.on("DELETE_USER", (socketId: string) => {
      console.log("user deleted ", socketId)
      setUsers((prev) => prev.filter((user) => user.socketId !== socketId))
    })

    socket.on("GET_MESSAGE", (data: IMessage) => {
      console.log("new message coming")
      setMessages((prev) => [...prev, data])
    })

    socket.on("GET_ROOM", (data: IRoom) => {
      console.log("new room coming")
      setRooms((prev) => [...prev, data])
    })

    socket.on("JOIN_ROOM", (data: IRoom) => {
      actions.joinRoom(data)
      history.push(`rooms/${data.id}`)
    })

    socket.on("UPDATE_ROOM", (data: IRoom) => {
      setRooms((prev) =>
        prev.map((room: IRoom) => (data.id === room.id ? data : room))
      )
    })

    return () => {
      socket.off("ADD_USER")
      socket.off("DELETE_USER")
      socket.off("GET_MESSAGE")
      socket.off("GET_ROOM")
      socket.off("JOIN_ROOM")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = (message: string) => {
    if (message.trim()) {
      socket.emit("SEND_MESSAGE", { socketId: socket.id, text: message })
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
        <div className="row">
          <Divider />
          <div className="col-md">
            <h4>Users</h4>
            <UsersList users={users} />
          </div>
          <div className="col-md-6 col-sm">
            <h4>Public chat</h4>
            <Chat messages={messages} />
          </div>
          <div className="col-md mb-5">
            <h4>Rooms</h4>
            <RoomsList rooms={rooms} />
          </div>
        </div>
      </div>
      <FormMessage sendMessage={sendMessage} />
    </>
  )
}
