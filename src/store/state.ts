import { IUser, IRoom } from "interfaces"

type rootState = {
  isAuth: boolean
  user: IUser
  curRoom: IRoom
}

export const state: rootState = {
  isAuth: false,
  user: {
    id: null,
    socketId: null,
    nickname: null,
    status: null,
  },
  curRoom: {
    id: null,
    name: null,
    messages: [],
    users: [],
    size: null,
  },
}
