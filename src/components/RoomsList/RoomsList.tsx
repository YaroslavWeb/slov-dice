import { useState } from "react"
import { socket } from "socket"

import { IRoom } from "interfaces"
import { block } from "bem-cn"
import { Button } from "components/Button"
import { Modal } from "components/Modal"
import { CreateRoom } from "components/ModalsContent/CreateRoom"

import "./styles.scss"

const BEM = block("rooms-list")

interface RoomsListProps {
  rooms: IRoom[]
}

export const RoomsList = ({ rooms }: RoomsListProps) => {
  const [isModal, setModal] = useState(false)

  const handleOpenModal = () => setModal(true)

  const handleCloseModal = () => setModal(false)

  const handleJoin = (roomId) => {
    socket.emit("USER_JOIN_ROOM", roomId)
  }

  return (
    <div className={BEM()}>
      <Button label="CREATE ROOM +" fullWidth onClick={handleOpenModal} />
      <div className={BEM("list").mix("mt-2")}>
        {rooms.length > 0 ? (
          rooms.map((room: IRoom) => (
            <div
              className={BEM("item").mix(["mb-2", "p-2", "rounded"])}
              key={room.name}
            >
              <span>{room.name}</span>
              <span>
                {room.users.length}/{room.size}
              </span>
              <Button
                label="Join"
                disabled={room.users.length >= room.size}
                onClick={() => handleJoin(room.id)}
              />
            </div>
          ))
        ) : (
          <span>No rooms yet</span>
        )}
      </div>
      <Modal
        title="ROOM"
        isOpen={isModal}
        handleClose={handleCloseModal}
        content={<CreateRoom />}
      />
    </div>
  )
}
