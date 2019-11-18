import styled from 'styled-components';
import Modal from 'react-modal';

import colors from '~/styles/colors';

export const Container = styled.div`
  margin: 0 auto;
  padding: 40px 370px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  padding: 30px;
  border-radius: 4px;
  background: #fff;
  overflow: auto;

  th {
    font-size: 16px;
    font-weight: bold;
    color: ${colors.dark};

    &:nth-child(1) {
      width: 80%;
      text-align: left;
    }

    &:nth-child(2) {
      text-align: right;
    }
  }

  td {
    padding: 15px 0;
    border-bottom: 1px solid ${colors.light};
    font-size: 16px;
    color: #666666;
    text-align: left;
    line-height: 20px;

    &:nth-child(1) {
      width: 80%;
      text-align: left;
    }
    &:nth-child(2) {
      text-align: right;
    }
  }
`;

export const ButtonPopup = styled(Modal)`
  width: 450px;
  border-radius: 4px;
`;
