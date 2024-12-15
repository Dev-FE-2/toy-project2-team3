import styled from 'styled-components';
import { colors } from '../../../../../../styles';
import { useFetchUserInfo } from '../../../../../../hooks';

const ModalHeader = () => {
  const { userInfo, isLoading, error } = useFetchUserInfo();

  if (isLoading) return <div>로딩중 입니다.. </div>;
  if (error) return <div>에러 : {error.message}</div>;

  return (
    <S.ModalHeader>
      <S.ModalHeaderRow>
        <div className="key">성명</div>
        <div className="value">{userInfo?.name}</div>
        <div className="key">사번</div>
        <div className="value">{userInfo?.employeeNumber}</div>
      </S.ModalHeaderRow>
      <S.ModalHeaderRow>
        <div className="key">부서</div>
        <div className="value">{userInfo?.department}</div>
        <div className="key">직급</div>
        <div className="value">{userInfo?.position}</div>
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
