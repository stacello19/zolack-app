import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);

  ${({ modal }: { modal?: boolean; }) => modal && `
    display: block;
  `}
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  width: 400px;
  border-radius: 10px;
`;

export const ModalHeader = styled.div`
  padding: 0.3rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  color: white;
  border-radius: 10px 10px 0 0;
`
export const ModalBody = styled.div`
  padding: 1rem 1rem 0 1rem;
`

export const Title = styled.div`
  font-size: 28px;
  font-weight: bold;
`

export const Close = styled.div`
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;
