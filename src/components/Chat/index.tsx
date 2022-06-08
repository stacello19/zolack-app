import React from 'react';
import { ChatWrapper } from './styles';
import ChatBox from '../basic/ChatBox';
import ChatHeader from '../basic/ChatHeader';
import { ChatHeaderProps } from '@typings/channel';

const ChatComponent = ({ activeChannel, channelName, setEditModal }: ChatHeaderProps) => {
  return (
    <ChatWrapper>
      <ChatHeader 
        activeChannel={activeChannel}
        channelName={channelName}
        setEditModal={setEditModal}
      />
      { activeChannel !== null ?
        <ChatBox 
          activeChannel={activeChannel}
        /> :
        <img src={'/images/hello.png'} alt='hello' width={500} height={500} />
      }
    </ChatWrapper>
  );
};

export default ChatComponent;