import styled from "styled-components";

export const ChatList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  cursor: pointer;
  ${({ active }: { active?: boolean; }) => active && `
    background: #caf0f8;
    border-left: 5px solid #013a63;
    color: #013a63;
  `}
`;

export const UserWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 2.5rem;
`;

export const OnOffFlag = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #25a18e;
  background: #FFF;
  ${({ active }: { active?: boolean; }) => active && `
    background: #25a18e;
  `}
`;

export const ChatListWrapper = styled.div`
  height: 800px;
  overflow-y: scroll;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ef476f;
    border-radius: 10px;
  }
`;

export const ChatHeading = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 2rem 2rem 1rem;
`;

export const Notification = styled.div`
  position: fixed;
  top: 100px;
  right: -350px;
  width: 250px;
  background: cornflowerblue;
  padding: 1rem;
  transition: all 0.5s;

  ${({ show }: { show?: boolean; }) => show && `
    right: 0px;
  `}
`;
