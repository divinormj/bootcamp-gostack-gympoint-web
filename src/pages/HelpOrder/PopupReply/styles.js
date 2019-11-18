import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  width: 450px;
  border-radius: 4px;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.dark};
  }
`;
