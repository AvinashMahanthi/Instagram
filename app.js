const express = require('express')
const  mongoose = require('mongoose')
const PORT = 3000
const app = express()
const { MONGOURI } = require('./keys')
require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=> {
    console.log("Oy yahhh!");
})
mongoose.connection.on('error',(e)=> {
    console.log("oh shit!",e);
})

app.listen(PORT, () => {
    console.log("Server Listening on the port",PORT);
})
