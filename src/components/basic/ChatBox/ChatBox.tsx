import React, { useEffect, useState, useRef } from 'react';
import { TypingDiv, ChatBoxWrapper, MessageBox, MessageWrap, Message, TextChatWrap, TextInput, TextButton, UsernameWrap } from './styles';
import { useSocket } from '@hooks/useSocketIo';
import Auth from '@utils/auth';
import { api } from '@utils/api';

const ChatBox = ({ activeChannel }: { activeChannel: number | null }) => {
  const username = Auth.getUsername();
  const [socket, disconnect] = useSocket(activeChannel);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typingNotify, setTypingNotify] = useState('');
  const msgRef = useRef<null | HTMLDivElement>(null);
  const testRef = useRef<null | HTMLDivElement>(null);

  const postMessage = (data: string, id: number | null, isAlert: boolean) => {
    socket?.emit('message', {
      message: data,
      alert: isAlert,
      channelId: id,
    });
  };

  const getMessage = async (id: number | null) => {
    const { data } = await api.get(`/api/message/${id}/chats`);
    setMessages(data.messages);
  };

  const handleTextChat = (e: any) => {
    const textMsg = e.target.value;
    setText(textMsg);

    let typingTimer;
    // typing session
    socket?.emit('typing', username);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      socket?.emit('typing', false);
    },2000);
  };

  const handleSendChat = () => {
    const isAlert = false;
    postMessage(text, activeChannel, isAlert)
    setText('');
    getMessage(activeChannel);
  };

  const handleEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      const isAlert = false;
      postMessage(text, activeChannel, isAlert);
      setText('');
      getMessage(activeChannel);
    }
  }

  useEffect(() => {
    if (socket && !socket.connected) {
      socket.auth = { username };
      socket.connect(); // user connecting channel
    }
    if (socket) {
      socket.on('new message', (isNewMsg) => {
        if (isNewMsg) {
          getMessage(activeChannel);
        }
      });

      socket.on('typing notification', (typingNotify) => {
        setTypingNotify(typingNotify);
      })
    }

    return () => {
      disconnect();
    }
  },[socket, activeChannel]);

  useEffect(() => {
    // fetching message data by channel
    if (activeChannel) {
      getMessage(activeChannel);
    }
  },[activeChannel])

  useEffect(() => {
    // automatically scroll to bottom
    if (msgRef && msgRef.current && testRef) {
      const { scrollTop, scrollHeight, clientHeight } = msgRef.current;
      if (scrollTop + clientHeight <= scrollHeight) {
        testRef.current?.scrollIntoView();
      }
    }
  },[msgRef, testRef, messages])

  return (
    <ChatBoxWrapper>
      <MessageBox ref={msgRef}>
        { messages?.length > 0 && messages?.map((msg: { alert: boolean; userID: string; message: string }, i ) => {
          return (
            <MessageWrap key={i} alert={msg.alert} isMe={msg.userID === username}>
              { !msg.alert && <UsernameWrap isMe={msg.userID === username}>{msg.userID}</UsernameWrap> }
              <Message alert={msg.alert} isMe={msg.userID === username}>{msg.message}</Message>
            </MessageWrap>
          )
        })}
        <div ref={testRef}/>
      </MessageBox>
      <TypingDiv>{typingNotify.length ? `${typingNotify}...` : ''}</TypingDiv>
      <TextChatWrap>
        <TextInput 
          type='text' 
          onChange={handleTextChat} 
          onKeyDown={handleEnterKey} 
          value={text}
        />
        <TextButton onClick={handleSendChat}>Send</TextButton>
      </TextChatWrap>
    </ChatBoxWrapper>
  )
};

export default ChatBox;
