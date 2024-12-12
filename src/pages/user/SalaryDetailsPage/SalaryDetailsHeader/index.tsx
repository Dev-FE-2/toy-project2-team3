import styled from 'styled-components';

const SalaryDetailsHeader = () => {
  return (
    <S.SalaryHeader>
      <S.Title>급여 리스트</S.Title>
    </S.SalaryHeader>
  );
};

const S = {
  SalaryHeader: styled.div`
    width: 100%;
    display: flex;
  `,

  Title: styled.div`
    margin-left: 7vw;
    font-size: 32px;
    margin-right: auto;
    font-weight: bold;
    margin-bottom: 2vh;
  `,
};

export default SalaryDetailsHeader;
