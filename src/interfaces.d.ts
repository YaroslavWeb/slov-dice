export interface IUser {
  id: number
  socketId: string
  nickname: string
  status: string
}

export interface IMessage {
  id: number
  socketId: string
  nickname: string
  text: string
}

export interface IRoom {
  id: number
  name: string
  messages: IMessage[]
  users: IUser[]
  size: number
  // heroes: IHero[]
}

export interface IHero {
  id: number
  avatar: string
  stats: any
}
