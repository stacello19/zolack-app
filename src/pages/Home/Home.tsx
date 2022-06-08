import React, { useCallback, useEffect, useState } from 'react';
import { HomeWrapper } from './styles';
import { PinkButton } from '@styles/commonStyle';
import Modal from '@components/basic/Modal';
import LabelForm from '@components/basic/LabelForm';
import ChatComponent from '@components/Chat';
import ListComponent from '@components/List';
import { api } from '@utils/api';
import { useSocket } from '@hooks/useSocketIo';


const HomePage = () => {
  const [socket] = useSocket(null);
  const [myChannels, setMyChannels] = useState([]);
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [modal, setModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [joinChannel, setJoinChannel] = useState({ name: '', id: '' });
  const [newChannelName, setNewChannelName] = useState('');
  const [editChannelName, setEditChannelName] = useState('');

  const getChatList = async () => {
    const { data: { myChannelsList, restChannelsList } } = await api.get('/api/channel/all');
    setMyChannels(myChannelsList);
    setChannels(restChannelsList);
  };

  useEffect(() => {
    getChatList();
  },[]);

  const createChannel = useCallback(async () => {
    if (!newChannelName.length) return;
    const { data } = await api.post('/api/channel/new', { channelName: newChannelName });
    if (data.code === 200) {
      getChatList();
      if (socket) {
        socket.emit('new channel', true);
      }
    }
    setNewChannelName('');
    setModal(false);
  },[newChannelName, myChannels, channels, socket]);

  const handleJoinChannel = useCallback(async (channelId) => {
    await api.post(`/api/channel/join/${channelId}`)
    setJoinModal(false);
    getChatList();
  },[joinChannel, myChannels, channels]);

  const handleEditChannel = useCallback(async () => {
    await api.put(`/api/channel/${activeChannel}`, { channelName: editChannelName });
    setEditChannelName('');
    setEditModal(false);
    setChannelName(editChannelName);
    getChatList();
  },[activeChannel, editChannelName, myChannels, channels]);

  return (
    <HomeWrapper>
      <Modal
        modal={modal}
        setModal={setModal}
        title={'Create a channel'}
      >
        <LabelForm label={'Channel Name'} value={newChannelName} name={'channel_name'} onChange={(e) => setNewChannelName(e.target.value)} />
        <PinkButton onClick={createChannel}>+ Create</PinkButton>
      </Modal>
      <Modal
        modal={joinModal}
        setModal={setJoinModal}
        title={'Join a channel'}
      >
        <h3>Do you want to join <span style={{ color: '#ef476f' }}>#{joinChannel.name}</span> channel?</h3>
        <PinkButton onClick={() => handleJoinChannel(joinChannel.id)}>Join</PinkButton>
      </Modal>
      <Modal
        modal={editModal}
        setModal={setEditModal}
        title={'Edit channel'}
      >
        <LabelForm label={'Channel Name'} value={editChannelName} name={'channel_name'} onChange={(e) => setEditChannelName(e.target.value)} />
        <PinkButton onClick={handleEditChannel}>Edit</PinkButton>
      </Modal>
      <ListComponent 
        activeChannel={activeChannel}
        myChannels={myChannels}
        channels={channels}
        setModal={setModal}
        setJoinModal={setJoinModal}
        setJoinChannel={setJoinChannel}
        setActiveChannel={setActiveChannel}
        setChannelName={setChannelName}
        getChatList={getChatList}
      />
      <ChatComponent
        activeChannel={activeChannel}
        channelName={channelName}
        setEditModal={setEditModal}
      />
    </HomeWrapper>
  )
};

export default HomePage;
