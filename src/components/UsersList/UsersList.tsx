import { socket } from "socket"
import { block } from "bem-cn"
import { IUser } from "interfaces"

import "./styles.scss"

const BEM = block("users-list")

interface UsersListProps {
  users: IUser[]
}

export const UsersList = ({ users }: UsersListProps) => {
  return (
    <ul className={BEM()}>
      {users.map((user: IUser) => (
        <li
          className={BEM("item").mix(["mb-2", "p-2", "rounded"])}
          key={user.id}
        >
          <span
            className={BEM("nickname", { me: user.socketId === socket.id })}
          >
            {user.nickname}
          </span>
          <span title="Online" className={BEM("status")} />
        </li>
      ))}
    </ul>
  )
}
