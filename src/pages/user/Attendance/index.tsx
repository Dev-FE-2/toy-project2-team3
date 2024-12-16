import { styled } from 'styled-components';
import { colors } from '../../../styles';

const Attendance = () => {
  return <S.Content>나의 근태 내용입니다.</S.Content>;
};

const S = {
  Content: styled.div`
    height: 100vh;
    width: 100%;
    background-color: ${colors.semantic.background.light};
  `,
};

export default Attendance;
