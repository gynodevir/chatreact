import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { room, message }); // Include the room when sending a message
  };

  useEffect(() => {
    socket.on('received_message', (data) => {
      setMessageReceived(data.message);
      alert(data.message);
    });
  }, []); // Empty dependency array to run only once

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  return (
    <div className="App">
      <input placeholder="Join the room" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom} type="submit">
        Join Room
      </button>
      <input placeholder="Message..." onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage} type="submit">
        Send Message
      </button>
      <h1>Messages</h1>
      {messageReceived}
    </div>
  );
}

export default App;
