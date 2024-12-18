import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../../../styles';
import { Item } from '../SalaryDetailsMain';

type BottomProps = {
  item: Item;
};

const ModalBottom: React.FC<BottomProps> = ({ item }) => {
  const wage =
    item.baseWorkingHours > 0 ? item.baseSalary / item.baseWorkingHours : 0;
  return (
    <S.ModalBottom>
      <S.ModalBottomRow>
        <S.ItemCeil>구분</S.ItemCeil>
        <S.ItemCeilDouble>산출식 또는 산출 방법</S.ItemCeilDouble>
        <S.ItemCeil>지급액 (원)</S.ItemCeil>
      </S.ModalBottomRow>
      <S.ModalBottomRow>
        <S.ItemCeil>연장근로수당</S.ItemCeil>
        <S.ItemCeilDouble>
          연장근로시간 수
          <div className="value">
            ({item.overtimeHours}시간) x {wage.toLocaleString()}(원) x 1.5
          </div>
        </S.ItemCeilDouble>
        <S.ItemCeil>
          <div className="value">
            {(wage * 1.5 * item.overtimeHours).toLocaleString()}
          </div>
        </S.ItemCeil>
      </S.ModalBottomRow>
      <S.ModalBottomRow>
        <S.ItemCeil>야간근로수당</S.ItemCeil>
        <S.ItemCeilDouble>
          야간근로시간 수
          <div className="value">
            ({item.nightWorkingHours}시간) x {wage.toLocaleString()}(원) x 0.5
          </div>
        </S.ItemCeilDouble>
        <S.ItemCeil>
          <div className="value">
            {' '}
            {(wage * 0.5 * item.nightWorkingHours).toLocaleString()}
          </div>
        </S.ItemCeil>
      </S.ModalBottomRow>
      <S.ModalBottomRow>
        <S.ItemCeil />
        <S.ItemCeilDouble />
        <S.ItemCeil />
      </S.ModalBottomRow>
    </S.ModalBottom>
  );
};

const S = {
  ModalBottom: styled.div`
    text-align: center;
  `,

  ItemCeil: styled.div`
    min-width: 25%;
    border: 1px solid ${colors.semantic.border.light};
    display: inline-block;

    .value {
      color: #4b89dc;
    }
  `,

  ItemCeilDouble: styled.div`
    min-width: 50%;
    min-height: 3.3vh;
    border: 0.5px solid ${colors.semantic.border.light};
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .value {
      color: #4b89dc;
      white-space: nowrap;
    }
  `,

  ModalBottomRow: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  `,
};
export default ModalBottom;
