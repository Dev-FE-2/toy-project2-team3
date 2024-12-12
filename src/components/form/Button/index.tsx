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

export const StyleCorrectiondButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.25vw;
  height: 4.63vh;
  background-color: ${colors.semantic.primary};
  color: ${colors.semantic.text.light};
  font-size: inherit;
  cursor: pointer;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: ${colors.semantic.hover.primary};
    color: ${colors.semantic.primary};
  }
`;
