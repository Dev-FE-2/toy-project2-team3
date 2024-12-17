import { styled } from 'styled-components';
import { colors } from '../../../styles';

function UserHomePage() {
  return <S.Content>유저 메인페이지 내용입니다.</S.Content>;
}

const S = {
  Content: styled.div`
    height: 100vh;
    width: 100%;
    background-color: ${colors.semantic.background.light};
  `,
};

export default UserHomePage;
