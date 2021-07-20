const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, { cors: true });

io.on('connection', socket => {
    console.log('Nice to meet you. (shake hand)');
    socket.emit('welcome','welcome to our chat app');
    socket.on('new_message_from_client', data => {
        socket.broadcast.emit('new_message_from_server', data);
    })
    socket.on('new_user_from_client', data => {
        socket.broadcast.emit('new_user_from_server', data);
    })
});