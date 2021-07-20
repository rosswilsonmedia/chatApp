import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = (props) => {
    const {username} = props;
    const [messages, setMessages] = useState([]);
    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        console.log('Is this running?');
        socket.on("new_message_from_server", msg => {
            setMessages(prevMessages => {
                return [...prevMessages, msg];
            })
        })

        socket.on("new_user_from_server", msg => {
            setMessages(prevMessages => {
                return [...prevMessages, msg];
            })
        })

        return () => {
            socket.disconnect(true);
        }
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('new_message_from_client', {
            sender: username,
            message: e.target.message.value
        })
        setMessages([...messages, {
            sender: 'You',
            message: e.target.message.value
        }])
        e.target.message.value='';
    }

    return (
        <div>
            <h1>Socket Chat App</h1>
            <div>
                {
                    messages.map((message) => {
                        if('user' in message){
                            return (
                                <p><i>{message.user} has joined the chat</i></p>
                            )
                        }
                        return (
                            <div>
                                <h3>{message.sender}</h3>
                                <p>{message.message}</p>
                            </div>
                        )
                    })
                }
            <form onSubmit={sendMessage}>
                <input type='text' name='message'/>
                <input type='submit' value='Send'/>
            </form>
            </div>
        </div>
    )
}

export default Chat;