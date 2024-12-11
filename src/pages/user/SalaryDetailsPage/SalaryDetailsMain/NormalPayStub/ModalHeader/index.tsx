import styled from 'styled-components';
import { colors } from '../../../../../../styles';

const ModalHeader = () => {
  return (
    <S.ModalHeader>
      <S.ModalHeaderRow>
        <div className="key">성명</div>
        <div className="value">홍길동</div>
        <div className="key">사번</div>
        <div className="value">073542</div>
      </S.ModalHeaderRow>
      <S.ModalHeaderRow>
        <div className="key">부서</div>
        <div className="value">개발지원팀</div>
        <div className="key">직급</div>
        <div className="value">팀장</div>
      </S.ModalHeaderRow>
    </S.ModalHeader>
  );
};

const S = {
  ModalHeader: styled.div`
    height: 15%;
    background-color: black;
    font-size: 20px;
    text-align: center;

    .key {
      width: 20%;
      background-color: #fff;
      border: 1px solid ${colors.semantic.text.gray};
      min-height: 6vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .value {
      width: 30%;
      background-color: #fff;
      border: 1px solid ${colors.semantic.text.gray};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #4b89dc;
    }
  `,

  ModalHeaderRow: styled.div`
    display: flex;
    flex-direction: row;
  `,
};

export default ModalHeader;
