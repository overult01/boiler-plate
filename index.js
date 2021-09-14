const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://new_user:did75788@yotubeclone.lgyhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));



app.get('/', (req, res) => res.send('hello world! 안녕하세요~~'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))