import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:5050';
const isDevelopment = process.env.NODE_ENV !== 'production';
const socketObj: { [key: number | string]: Socket } = {}

export const useSocket = (channel: number | null): [Socket | undefined, () => void] => {
  const socketChannel = !channel ? 'default' : channel;

  const disconnect = () => {
    if (socketObj[socketChannel]) {
      console.log('leaving channel: ', channel, socketObj[socketChannel]);
      socketObj[socketChannel].disconnect();
      delete socketObj[socketChannel];
    }
  };
  
  if (!socketObj[socketChannel]) {
    socketObj[socketChannel] = io(!channel ? URL : `${URL}/ch-${channel}`, {
      'transports': ['websocket']
    });
  }

  isDevelopment && socketObj[socketChannel].onAny((event, ...args) => {
    console.log('[DEV] socket io: ', event, args);
  });
  
  socketObj[socketChannel].on("connect_error", (err) => {
    if (err.message === "invalid username") {
      console.log('socket connect error!!!!!');
      socketObj[socketChannel].off();
    }
  });

  return [socketObj[socketChannel], disconnect];
};
