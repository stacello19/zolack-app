import styled from "styled-components";


export const ChatBoxWrapper = styled.div`
  width: 800px;
  height: calc(100vh - 250px);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  z-index: 99;
  background: #013a63;
  color: white;
`;

export const MessageBox = styled.div`
  height: calc(100vh - 400px);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow-y: scroll;
  padding: 1rem;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ef476f;
    border-radius: 10px;
  }
`;

export const MessageWrap = styled.div`
  display: grid;
  ${(props: { alert?: boolean; isMe?: boolean; }) => {
    if (props.alert) {
      return `
      align-self: center;
      font-style: italic;
    `
    } else if (props.isMe) {
      return `
        align-self: end;
    `
    } else {
      return `
        align-self: start;
      `
    }
  }}
`;

export const Message = styled.div`
${(props: { alert?: boolean; isMe?: boolean; }) => {
  if (props.alert) {
    return;
  } else if (props.isMe) {
    return `
      width: max-content;
      border-radius: 10px;
      padding: 0.5rem;
      background: #bfdbf7;
      color: black;
      justify-self: end;
  `
  } else {
    return `
      width: max-content;
      border-radius: 10px;
      padding: 0.5rem;
      background: #ccdbdc;
      color: black;
    `
  }
}}
`

export const TextChatWrap = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;

export const TextInput = styled.input`
  width: 100%;
  margin: 1rem;
  height: 70%;
  border-radius: 10px;
  outline: none;
  border: none;
`;

export const TextButton = styled.button`
  width: 100px;
  height: 50px;
  margin-right: 1rem;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  background: #ffafcc;
  cursor: pointer;
  font-weight: 700;
`;

export const UsernameWrap = styled.div`
  ${(props: { isMe?: boolean; }) => {
    if (props.isMe) {
      return`
        text-align: end;
      `;
    }
  }}
`;

export const TypingDiv = styled.div`
  height: 30px;
  text-align: center;
`;
