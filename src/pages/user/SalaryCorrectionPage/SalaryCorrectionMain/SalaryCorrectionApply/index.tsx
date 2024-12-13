import { useState } from 'react';
import styled from 'styled-components';
import ApplyHeader from './ApplyHeader';
import ApplyMiddle from './ApplyMiddle';
import ApplyBottom from './ApplyBottom';

const SalaryCorrectionApply = () => {
  const [overtimeTotal, setOvertimeTotal] = useState(0);
  //const [nighttimeTotal, setNighttimeTotal] = useState(0);

  const handleOvertimeUpdate = (newTotal: number) => {
    setOvertimeTotal(newTotal);
  };

  // const handleNighttimeUpdate = (newTotal) => {
  //   setNighttimeTotal(newTotal);
  // };

  return (
    <S.ApplyContainer>
      <ApplyHeader />
      <ApplyMiddle
        onOvertimeUpdate={handleOvertimeUpdate}
        //onNighttimeUpdate={handleNighttimeUpdate}
      />
      <ApplyBottom
        overtimeTotal={overtimeTotal}
        //nighttimeTotal={nighttimeTotal}
      />
    </S.ApplyContainer>
  );
};

const S = {
  ApplyContainer: styled.div`
    width: 70vw;
    height: 85vh;
    margin-left: 7vw;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-ceil {
      width: 24vw;
      height: 3.7vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .align-center {
      width: 17.71vw;
      height: 3.7vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};

export default SalaryCorrectionApply;
