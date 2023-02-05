import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import db from './database'

dotenv.config();

const app: Express = express()
const port = process.env.PORT
const url = process.env.URL

app.use('/', express.text())

app.get('/', (req: Request, res: Response) => {
  //console.log(`called from ${req.ip}`)
  //db.write_log(`called from ${req.ip}`)
  // res.write(`${req.ip}\r\n`)

  // for (let i = 0; i < req.rawHeaders.length; i+=2) {
  //   const name = req.rawHeaders[i]
  //   const value = req.rawHeaders[i + 1]

  //   res.write(`${name}:${value}`)
  //   res.write('\r\n')
  // }
  // res.write(JSON.stringify(req.body))
  //const logs = db.read_log();

  db.connection.all(`SELECT * FROM log LIMIT 20`, (_: Error, rows: string[]) => {
    rows.forEach(row => {
      res.write(`${JSON.stringify(row)}\r\n`)
    })
    res.end()
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${url}:${port}`)
})