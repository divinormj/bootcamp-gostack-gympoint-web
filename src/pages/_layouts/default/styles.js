import styled from 'styled-components';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
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
      background: ${colors.primary};

      span {
        margin-left: 8px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
`;

export const ButtonEdit = styled.button`
  border: none;
  font-size: 15px;
  color: #4d85ee;
  text-align: right;
  background: #fff;
`;

export const ButtonDelete = styled.button`
  border: none;
  font-size: 15px;
  color: #de3b3b;
  text-align: right;
  background: #fff;
`;
