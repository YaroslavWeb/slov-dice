const express = require("express")

const app = express()
const server = require("http").Server(app)
const path = require("path")
const io = require("socket.io")(server, { cors: { origin: "*" } })

app.use(express.json())

const USERS = new Map()
const PUBLIC_CHAT = new Map()
const ROOMS = new Map()

app.use(express.static(path.join(__dirname, "../build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../build/index.html"))
})

// req - то что передал клиент
// res - то что передал сервер

app.post("/public", (req, res) => {
  const data = {
    users: [...USERS.values()],
    publicChat: [...PUBLIC_CHAT.values()],
    rooms: [...ROOMS.values()],
  }

  res.json(data)
})

app.post("/register", (req, res) => {
  const { nickname, socketId } = req.body
  if (!USERS.has(nickname)) {
    const user = {
      id: USERS.size + 1,
      socketId,
      nickname,
      status: "online",
    }

    USERS.set(socketId, user)
    return res.send(user)
  }

  res.send(USERS.get(nickname))
})

io.on("connection", (socket) => {
  console.log("socket connected", socket.id)

  socket.on("REG_USER", (socketId) => {
    const user = USERS.get(socketId)
    socket.broadcast.emit("ADD_USER", user)
  })

  socket.on("SEND_MESSAGE", ({ socketId, text }) => {
    const user = USERS.get(socketId)
    const message = {
      id: PUBLIC_CHAT.size + 1,
      socketId,
      nickname: user.nickname,
      text,
    }
    PUBLIC_CHAT.set(message.id, message)
    io.emit("GET_MESSAGE", message)
  })

  socket.on("CREATOR_JOIN_ROOM", ({ name, size }) => {
    const user = USERS.get(socket.id)
    const room = {
      id: Date.now(),
      name,
      messages: [],
      users: [user],
      size,
    }
    ROOMS.set(room.id, room)
    socket.join(room.id)
    socket.emit("JOIN_ROOM", room)
    socket.broadcast.emit("GET_ROOM", room)
  })

  socket.on("USER_JOIN_ROOM", (roomId) => {
    const room = ROOMS.get(roomId)
    const user = USERS.get(socket.id)

    ROOMS.get(roomId).users.push(user)

    socket.join(roomId)
    socket.emit("JOIN_ROOM", room)
    socket.broadcast.emit("UPDATE_ROOM", room)
    socket.to(roomId).broadcast.emit("ROOM:NEW_USER", user)
  })

  socket.on("ROOM:SEND_MESSAGE", ({ roomId, socketId, text }) => {
    const user = USERS.get(socketId)
    let msg = ""
    const roll = (min, max) => Math.floor(Math.random() * max + min)

    if (text.startsWith("/")) {
      const command = text.split("/")[1]
      switch (command) {
        case "d8":
          msg = command + ": " + roll(1, 8)
          break

        case "d12":
          msg = command + ": " + roll(1, 12)
          break

        case "d20":
          msg = command + ": " + roll(1, 20)
          break

        case "d24":
          msg = command + ": " + roll(1, 24)
          break

        default:
          break
      }
    } else {
      msg = text
    }
    const message = {
      id: PUBLIC_CHAT.size + 1,
      socketId,
      nickname: user.nickname,
      text: msg,
    }

    ROOMS.get(roomId).messages.push(message)

    io.emit("ROOM:GET_MESSAGE", message)
  })

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id)
    if (USERS.has(socket.id)) {
      USERS.delete(socket.id)
      socket.broadcast.emit("DELETE_USER", socket.id)
    }

    // TODO: Удаление пользователя из бд
    ROOMS.forEach((value, roomId) => {
      socket.to(roomId).broadcast.emit("ROOM:DELETE_USER", socket.id)
    })
  })
})

server.listen(process.env.PORT || 4040, (err) => {
  if (err) throw Error(err)
  console.log("Slov dice server started")
})

// sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// // list socketid
// for (var socketid in io.sockets.sockets) {}
//  OR
// Object.keys(io.sockets.sockets).forEach((socketid) => {});
