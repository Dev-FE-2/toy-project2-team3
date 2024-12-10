import React from 'react';
import SalaryCorrectionList from './SalaryCorrectionList';
import SalaryCorrectionApply from './SalaryCorrectionApply';

type Props = {
  isVisible: boolean;
};

const SalaryCorrectionMiddle: React.FC<Props> = ({ isVisible }) => {
  return (
    <>{isVisible ? <SalaryCorrectionApply /> : <SalaryCorrectionList />}</>
  );
};

export default SalaryCorrectionMiddle;
