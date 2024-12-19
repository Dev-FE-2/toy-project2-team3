import styled from 'styled-components';
import { padding } from '../../styles';
import { Icon } from '../../components';

const NavText = ({
  text,
  icon,
  iconSize,
}: {
  text: string;
  icon: string;
  iconSize?: number;
}) => {
  return (
    <S.NavText>
      {icon && <Icon name={icon} size={iconSize} />}
      {text}
    </S.NavText>
  );
};

const S = {
  NavText: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${padding.sm};
  `,
};

export default NavText;
