import styled from 'styled-components';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
`;

export const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  padding: 40px 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.dark};
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      display: flex;
      height: 40px;
      padding: 5px 20px;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      color: #ffffff;
      border: 1px solid ${colors.border};
      border-radius: 4px;
      margin-right: 10px;

      span {
        margin-left: 8px;
        font-size: 14px;
        font-weight: bold;
      }

      &:nth-child(1) {
        background: ${colors.darkSecundary};
      }
      &:nth-child(2) {
        background: ${colors.primary};
      }
    }
  }
`;

export const DataEntry = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border-radius: 4px;
  padding: 30px 30px 10px 30px;
`;

export const DataEntryInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  strong {
    font-size: 14px;
    color: ${colors.dark};
  }

  select {
    margin-top: 10px;
  }

  input {
    margin-top: 10px;
    border: 1px solid ${colors.border};
    border-radius: 4px;
    font-size: 16px;
    color: ${colors.darkLight};
    padding: 10px;

    &:read-only {
      background: #f5f5f5;
    }
  }

  span {
    color: ${colors.primary};
  }
`;

export const DataEntryRow = styled.div`
  display: flex;
  width: 100%;

  div:nth-child(2) {
    margin: 0 10px;
  }
`;
