import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid lightgrey;
  width: 100%;
  cursor: pointer;
  margin: 2em 0;
`;

export const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    width: 80%;
  }
`;
