import styled from 'styled-components';
import { colors } from '../styles';

type Color =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'neutralVariant'
  | 'success'
  | 'danger'
  | 'warning';

interface BadgeProps {
  color: Color;
  text: string;
  padding?: string;
  maxWidth?: string;
  maxHeight?: string;
}

const Badge = ({ color, text, padding, maxWidth, maxHeight }: BadgeProps) => {
  return (
    <S.Badge
      color={color}
      padding={padding}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
    >
      {text}
    </S.Badge>
  );
};

const S = {
  Badge: styled.div<Omit<BadgeProps, 'text'>>`
    box-sizing: border-box;
    padding: ${(props) => (props.padding ? props.padding : '3px 10px')};
    line-height: 2;
    border-radius: 6px;
    text-align: center;
    font-size: 12px;
    border-radius: 30px;
    /* max-width: 70px; */
    max-width: ${(props) => props.maxWidth && props.maxWidth};
    max-height: ${(props) => props.maxHeight && props.maxHeight};
    cursor: pointer;
    ${(props) =>
      props.color === 'primary' &&
      `background-color: ${colors.scale.primary.s200};
       color: ${colors.semantic.primary};
       `}
    ${(props) =>
      props.color === 'secondary' &&
      `background-color: ${colors.scale.secondary.s200};
       color: ${colors.semantic.secondary};
       `}
    ${(props) =>
      props.color === 'neutral' &&
      `background-color: ${colors.scale.neutral.s200};
       color: ${colors.semantic.neutral};
       `}
    ${(props) =>
      props.color === 'neutralVariant' &&
      `background-color: ${colors.scale.neutralVariant.s200};
       color: ${colors.semantic.nuetralVariant};
       `}
    ${(props) =>
      props.color === 'success' &&
      `background-color: ${colors.scale.success.s200};
       color: ${colors.semantic.success};
       `}
    ${(props) =>
      props.color === 'danger' &&
      `background-color: ${colors.scale.danger.s200};
       color: ${colors.semantic.danger};
       `}
    ${(props) =>
      props.color === 'warning' &&
      `background-color: ${colors.scale.warning.s200};
       color: ${colors.semantic.warning};
       `}
  `,
};

export default Badge;
