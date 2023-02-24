import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import db from './database'
import utils from './utils'

dotenv.config();

const app: Express = express()
const port = process.env.PORT
const url = process.env.URL

app.use('/', express.text())

app.get('/', (req: Request, res: Response) => {
  let ip = utils.getIp(req.socket.remoteAddress || req.ip)
  if (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].length > 0) {
    ip = (req.headers['x-forwarded-for'] as string).split(',')[0]
  }
  
  console.log(`called from ${ip}`)
  db.write_log(`called from ${ip}`)
  
  // res.write(`${req.ip}\r\n`)

  // for (let i = 0; i < req.rawHeaders.length; i+=2) {
  //   const name = req.rawHeaders[i]
  //   const value = req.rawHeaders[i + 1]

  //   res.write(`${name}:${value}`)
  //   res.write('\r\n')
  // }
  // res.write(JSON.stringify(req.body))
  //const logs = db.read_log();

  db.connection.all(`SELECT * FROM log order by id desc LIMIT 20`, (_: Error, rows: string[]) => {
    rows.forEach(row => {
      res.write(`${JSON.stringify(row)}\r\n`)
    })
    res.end()
  })
})

app.get('/clear', (req: Request, res: Response) => {
  db.clear_log()
  res.send('log cleared!')
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${url}:${port}`)
})