import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 2.5rem 0;
  width: 800px;
`;

export const LeftWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ChannelName = styled.div`
  font-size: 30px;
  font-weight: bolder;
  padding-left: 0.5rem;
  border-left: 5px solid #ef476f;
  color: #ef476f;
  text-transform: uppercase;
`;

export const MemberDiv = styled.div`
  padding: 0.2rem;
  border: 3px solid lightgray;
  border-radius: 10px;
  font-weight: bold;
  color: gray;
`;
