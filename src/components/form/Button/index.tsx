import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles';

type Color = 'primary' | 'success' | 'danger' | 'disabled';

interface ButtonProps {
  color: Color;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  padding?: string;
  maxWidth?: string;
  maxHeight?: string;
}

const Button = ({
  color,
  text,
  onClick,
  padding,
  maxWidth,
  maxHeight,
}: ButtonProps) => {
  return (
    <S.Button
      color={color}
      padding={padding}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onClick={onClick}
    >
      {text}
    </S.Button>
  );
};

const S = {
  Button: styled.button<{
    color: Color;
    padding?: string;
    maxWidth?: string;
    maxHeight?: string;
  }>`
    box-sizing: border-box;
    padding: ${(props) => (props.padding ? props.padding : '13px 28px')};
    border-radius: 6px;
    max-width: ${(props) => props.maxWidth && props.maxWidth};
    max-height: ${(props) => props.maxHeight && props.maxHeight};
    cursor: pointer;
    ${(props) =>
      props.color === 'primary' &&
      `background-color: ${colors.semantic.primary};
       border: 1px solid ${colors.semantic.primary};
       color: ${colors.semantic.light};
       
       &:hover {
         background-color: ${colors.semantic.hover.primary};
         border: 1px solid ${colors.semantic.primary};
         color: ${colors.semantic.primary};
       }
       `}

    ${(props) =>
      props.color === 'success' &&
      `background-color: ${colors.semantic.success};
       border: 1px solid ${colors.semantic.success};
       color: ${colors.semantic.light};
       
       &:hover {
         background-color: ${colors.semantic.hover.success};
         border: 1px solid ${colors.semantic.success};
         color: ${colors.semantic.success};
       }
       `}
    ${(props) =>
      props.color === 'danger' &&
      `background-color: ${colors.semantic.danger};
       border: 1px solid ${colors.semantic.danger};
       color: ${colors.semantic.light};
       
       &:hover {
         background-color: ${colors.semantic.hover.danger};
         border: 1px solid ${colors.semantic.danger};
         color: ${colors.semantic.danger};
       }
       `}
    ${(props) =>
      props.color === 'disabled' &&
      `background-color: ${colors.semantic.disabled};
       border: 1px solid ${colors.semantic.disabled};
       color: ${colors.semantic.light};
       cursor: not-allowed;
       `}
  `,
};

export default Button;
