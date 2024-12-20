import { styled } from 'styled-components';

const Icon = ({ name, size }: { name: string; size?: number }) => {
  return (
    <S.Icon size={size} className="material-symbols-outlined">
      {name}
    </S.Icon>
  );
};

const S = {
  Icon: styled.span<{ size?: number }>`
    font-family: 'Material Symbols Outlined';
    font-size: ${(props) => (props.size ? `${props.size}px` : '24px')};
  `,
};

export default Icon;
