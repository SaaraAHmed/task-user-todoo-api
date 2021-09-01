const express = require('express')
const userRouter = require('./routers/user')
const todooRouter = require('./routers/todoo')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(todooRouter)
const port = 3000

app.listen(port,()=>{console.log('Server is running')})
