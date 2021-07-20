import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import io from 'socket.io-client';


function App() {
  const [username, setUsername] = useState('');
  const [socket] = useState(() => io(':8000'));

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit('new_user_from_client', {
      user: e.target.username.value
    })
    setUsername(e.target.username.value);
  }
  return (
    <>
      {
        username?
        <Chat username={username}/>:
        <form onSubmit={submitHandler}>
          <h1>Get started right now!</h1>
          <p>I want to start chatting with the name...</p>
          <input
            type='text'
            name='username'
            id='username'
          />
          <input type='submit' value='Start Chatting'/>
        </form>
      }
    </>
  );
}

export default App;
