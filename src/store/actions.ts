import { IUser, IRoom, IMessage } from "interfaces"
import { Action } from "overmind"

export const register: Action<IUser> = ({ state }, user) => {
  state.isAuth = true
  state.user = user
}

export const joinRoom: Action<IRoom> = ({ state }, room) => {
  state.curRoom = room
}

export const addUserToRoom: Action<IUser> = ({ state }, user) => {
  state.curRoom.users = [...state.curRoom.users, user]
}

export const getMessageToRoom: Action<IMessage> = ({ state }, message) => {
  state.curRoom.messages = [...state.curRoom.messages, message]
}

export const deleteUserFromRoom: Action<string> = ({ state }, socketId) => {
  state.curRoom.users = state.curRoom.users.filter(
    (user) => user.socketId !== socketId
  )
}
