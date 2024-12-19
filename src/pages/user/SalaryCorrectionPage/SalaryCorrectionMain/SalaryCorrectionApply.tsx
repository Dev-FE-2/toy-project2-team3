import React, { useState } from 'react';
import styled from 'styled-components';
import ApplyHeader from './SalaryCorrectionApply/ApplyHeader';
import type { OvertimeRecord } from './SalaryCorrectionApply/ApplyMiddle';
import ApplyMiddle from './SalaryCorrectionApply/ApplyMiddle';
import ApplyBottom from './SalaryCorrectionApply/ApplyBottom';

type ApplyProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const SalaryCorrectionApply: React.FC<ApplyProps> = ({ setIsVisible }) => {
  const [overtimeTotal, setOvertimeTotal] = useState(0);
  const [overtimeRecords, setOvertimeRecords] = useState<OvertimeRecord[]>([]);

  const handleOvertimeUpdate = (newTotal: number) => {
    setOvertimeTotal(newTotal);
  };

  return (
    <S.ApplyContainer>
      <ApplyHeader />
      <ApplyMiddle
        onOvertimeUpdate={handleOvertimeUpdate}
        setOvertimeRecords={setOvertimeRecords}
        overtimeTotal={overtimeTotal}
        setOvertimeTotal={setOvertimeTotal}
      />
      <ApplyBottom
        overtimeTotal={overtimeTotal}
        overtimeRecords={overtimeRecords}
        setIsVisible={setIsVisible}
      />
    </S.ApplyContainer>
  );
};

const S = {
  ApplyContainer: styled.div`
    width: 100%;
    height: 85vh;
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
