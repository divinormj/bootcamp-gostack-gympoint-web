import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '~/styles/colors';

export const Container = styled.div`
  padding: 30px;
  border: 1px solid ${colors.border};
  background: #fff;
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 28px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid ${colors.border};
    }
  }
`;

export const User = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block; /*Linha toda*/
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.darkLight};
    }

    button {
      display: block; /*Linha toda*/
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.primary};
      border: none;
      background: #fff;
    }
  }
`;

export const ToLink = styled(Link)`
  padding: 20px;
  font-size: 15px;
  font-weight: bold;
  color: ${prop => (prop.active ? colors.dark : colors.darkLight)};

  &:hover {
    color: ${colors.dark};
  }
`;
