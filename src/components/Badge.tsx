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
    max-width: ${(props) => props.maxWidth && props.maxWidth};
    max-height: ${(props) => props.maxHeight && props.maxHeight};
    cursor: pointer;
    background-color: ${({ color }) => colors.scale[color].s200};
    color: ${({ color }) => colors.semantic[color]};
  `,
};

export default Badge;
