import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"

import booksRouter from "./books/index.js"

const server = express()

const port = process.env.PORT || 3001

// MIDDLEWARES

const whitelist = [process.env.FRONTEND_DEV_URL, process.env.FRONTEND_CLOUD_URL]

const corsOptions = {
  origin: function (origin, next) {
    console.log("ORIGIN ", origin)
    if (whitelist.indexOf(origin) !== -1) {
      // origin allowed
      next(null, true)
    } else {
      // origin not allowed
      next(new Error("CORS TROUBLES!!!!!"))
    }
  },
}
// CORS -> Cross Origin Resource Sharing
// Different Origins --> http://domain-a.com different than http://domain-b.com
// Different Origins --> http://localhost:3000 different than http://localhost:3001
// Different Origins --> http://domain-a.com different than https://domain-a.com
server.use(cors(corsOptions))
server.use(express.json())

// ROUTES
server.use("/books", booksRouter)

// ERROR HANDLERS

console.table(listEndpoints(server))

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})
