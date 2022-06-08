import React, { useCallback, useEffect, useState } from 'react';
import { ChatList, UserWrapper, OnOffFlag, ChatListWrapper, ChatHeading, Notification } from './styles';
import { ChannelProps, UserProps } from '@typings/channel';
import { useSocket } from '@hooks/useSocketIo';
import { api } from '@utils/api';
import Auth from '@utils/auth';

interface ListProps {
  activeChannel: null | number;
  myChannels: Array<ChannelProps>;
  channels: Array<ChannelProps>;
  setModal: (e: any) => void;
  setJoinModal: (e: any) => void;
  setJoinChannel: (e: any) => void;
  setActiveChannel: (e: any) => void;
  setChannelName: (e: any) => void;
  getChatList: () => void;
}

const ListComponent = ({
  activeChannel,
  myChannels,
  channels,
  setModal,
  setJoinModal,
  setJoinChannel,
  setActiveChannel,
  setChannelName,
  getChatList
}: ListProps) => {
  const [socket] = useSocket(null);
  const [users, setUsers] = useState<Array<UserProps>>([]);
  const [connectedUser, setConnectedUser] = useState({ userID: '', username: '' });
  const [notification, setNotification] = useState(false);
  const username = Auth.getUsername();

  useEffect(() => {
    if (socket && !socket.connected) {
      socket.auth = { username };
      socket.connect(); // user logs in
    }
    if (socket) {
      // socket io parts
      socket?.on('users', (users) => {
        setUsers(users);
      });
      socket?.on("online", (user) => {
        setConnectedUser(user);
      });
      socket?.on("offline", (users) => {
        setUsers(users); // update offline status
      });
      socket.on('getList', (isNewList) => {
        if (isNewList) {
          getChatList();
        }
      })
    }
  },[socket, username])

  useEffect(() => {
    setNotification(true);
    const timeout = setTimeout(() => {
      setNotification(false);
    },1500);
    return () => {
      clearTimeout(timeout);
    }
  },[connectedUser])

  const handleActiveChannel = useCallback((id, name) => {
    if (channels.some((channel: ChannelProps) => channel.channel_name === name)) {
      setJoinModal(true);
      setJoinChannel({ name, id });
      return;
    }
    setActiveChannel(id);
    setChannelName(name);
  },[myChannels, channels]);

  const handleLeaveChannel = useCallback(async (e, channelId) => {
    e.stopPropagation();
    await api.post(`/api/channel/exit/${channelId}`);
    setActiveChannel(null);
    setChannelName('');
    getChatList();
  },[myChannels, channels]);

  const renderChatList = useCallback((chatList) => {
    return chatList?.map((chat: ChannelProps) => (
      <ChatList 
        key={chat.id} 
        active={chat.id === activeChannel} 
        onClick={() => handleActiveChannel(chat.id, chat.channel_name)}
      >
        #{chat.channel_name}
        <img src={'/images/delete.svg'} alt='delete' onClick={(e) => handleLeaveChannel(e, chat.id)} />
      </ChatList>
    ))
  },[activeChannel, myChannels, channels]);

  const renderUserList = useCallback((userList) => {
    return userList?.map((user: UserProps) => (
      <UserWrapper 
        key={user.userID} 
      >
        <OnOffFlag active={user.isOnline} />
        {user.username}
        { username === user.username && <span>(you)</span>}
      </UserWrapper>
    ))
  },[socket, users]);

  return (
    <ChatListWrapper>
      { connectedUser.userID && <Notification show={notification}>{connectedUser.username} is online</Notification> }
      <ChatHeading>
        <div>{'My Chats'}</div>
        <div style={{ cursor: 'pointer' }} onClick={() => setModal(true)}>+</div>
      </ChatHeading>
      { renderChatList(myChannels) }
      <ChatHeading>{'Chats'}</ChatHeading>
      { renderChatList(channels) }
      <ChatHeading>{'Users'}</ChatHeading>
      { renderUserList(users) }
    </ChatListWrapper>
  );
};

export default ListComponent;
