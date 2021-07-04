import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, name, imageUrl, children }) {
  const [socket, setSocket] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const newSocket = io('https://ironfolio.herokuapp.com:5001');
    newSocket.emit('user', { id, name, imageUrl });
    setSocket(newSocket);
    newSocket.on('users', (list) => {
      setUsers(list);
    });
    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={(socket, users)}>
      {children}
    </SocketContext.Provider>
  );
}
