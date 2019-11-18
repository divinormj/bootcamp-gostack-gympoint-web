import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${colors.primary};

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    padding: 50px 30px;
    background: #fff;
    border: 1px solid ${colors.border};
    border-radius: 4px;

    form {
      padding: 30px 0 0 0;
      display: flex;
      flex-direction: column;

      strong {
        color: #444;
        text-align: left;
        padding-bottom: 8px;
      }

      input {
        height: 40px;
        padding: 10px;
        font-size: 16px;
        color: ${colors.darkLight};
        border: 1px solid ${colors.border};
        border-radius: 4px;

        & + strong {
          padding-top: 20px;
        }
      }

      span {
        color: ${colors.primary};
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
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
    }
  }
`;
