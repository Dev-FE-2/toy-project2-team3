import React from 'react';
import SalaryCorrectionList from './SalaryCorrectionList';
import SalaryCorrectionApply from './SalaryCorrectionApply';

type MiddleProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const SalaryCorrectionMiddle: React.FC<MiddleProps> = ({
  isVisible,
  setIsVisible,
}) => {
  return isVisible ? (
    <SalaryCorrectionApply isVisible={isVisible} setIsVisible={setIsVisible} />
  ) : (
    <SalaryCorrectionList />
  );
};

export default SalaryCorrectionMiddle;
