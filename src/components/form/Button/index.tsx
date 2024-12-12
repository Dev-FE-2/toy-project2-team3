import styled from 'styled-components';
import { colors, font } from '../../../styles';

export const StyledCancelButton = styled.div`
  background-color: ${colors.semantic.danger};
  color: ${colors.semantic.text.light};
  border: none;
  cursor: pointer;
  width: 6vw;
  height: 6vh;
  font-size: ${font.size.paragraph};
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCheckButton = styled.div`
  background-color: ${colors.semantic.success};
  color: ${colors.semantic.text.light};
  border: none;
  cursor: pointer;
  width: 6vw;
  height: 6vh;
  font-size: ${font.size.paragraph};
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;
