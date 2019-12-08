import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 450px;
  margin: 260px auto;
  border-radius: 4px;
  background: #fff;
`;

export const Question = styled.div`
  display: flex;
  width: 450px;
  flex-direction: column;
  padding: 30px;

  strong {
    font-size: 14px;
    color: ${colors.dark};
    text-align: left;
    margin-bottom: 8px;
  }

  span {
    font-size: 16px;
    color: #666;
    line-height: 26px;
    text-align: left;
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    resize: none !important;
    border-color: ${colors.border};
    font-size: 16px;
    color: ${colors.darkSecundary};
    text-align: left;
  }

  button {
    height: 40px;
    display: flex;
    justify-content: center;
    background: ${colors.primary};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 20px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, colors.primary)};
    }
  }
`;

export const Close = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-bottom: -50px;
  }
`;
