import React, { useState, useEffect } from 'react';
import { Wrapper, LeftWrapper, ChannelName, MemberDiv } from './styles';
import Tooltip from '../Tooltip';
import { ChatHeaderProps } from '@typings/channel';
import { api } from '@utils/api';
import { useSocket } from '@hooks/useSocketIo';

const ChatHeader = ({ activeChannel, channelName, setEditModal }: ChatHeaderProps) => {
  const [socket] = useSocket(activeChannel);
  const [count, setCount] = useState(1);
  const [memberList, setMemberList] = useState('');
  const isActive = activeChannel === null;

  const getChannelInfo = async (channelId: number | null) => {
    if (!channelId) return;
    const { data } = await api.get(`/api/channel/${channelId}`);
    const members = data.members.length + 1;
    const ownerName = `${data.channelInfo.User.firstName} ${data.channelInfo.User.lastName}`;
    const list = data.members.map((member: { firstName: string; lastName: string; }) => `${member.firstName} ${member.lastName}`)
                              .concat([ownerName]).join(', ');
    setMemberList(list);
    setCount(members);
  };

  useEffect(() => {
    getChannelInfo(activeChannel);
  },[activeChannel]);

  useEffect(() => {
    if (socket) {
      socket.on('fetch room data', (hasUpdatedRoomData) => {
        if (hasUpdatedRoomData) {
          getChannelInfo(activeChannel);
        }
      })
    }
  },[socket])

  return (
    <Wrapper>
      <LeftWrapper>
        <ChannelName>#{ isActive ? 'Start a chat' : `${channelName}` }</ChannelName>
        { !isActive &&
          <img 
            src={'/images/edit.svg'} 
            alt='edit' 
            onClick={() => setEditModal(true)}
          />
        }
      </LeftWrapper>
      { !isActive && 
        <Tooltip
          content={
            <React.Fragment>
              <div style={{ fontWeight: 700 }}>View all members of this channel</div>
              <div>Includes: {memberList}</div>
            </React.Fragment>
          }
        >
          <MemberDiv>Members: {count}</MemberDiv> 
        </Tooltip>
      }
    </Wrapper>
  )
};

export default ChatHeader;
