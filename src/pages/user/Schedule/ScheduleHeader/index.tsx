import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { border } from '../../../../styles';
import Button from '../../../../components/form/Button';
import { RootState } from '../../../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsDayClick,
  setIsModalOpen,
  setModalType,
} from '../../../../slices/schedule/scheduleSlice';

const ScheduleHeader = () => {
  const dispatch = useDispatch();
  const { isDayClick, clickedDate, teamData } = useSelector(
    (state: RootState) => state.schedule
  );
  const [year, month, day] = clickedDate;
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedClickedDate = `${year}-${formattedMonth}-${formattedDay}`;
  const teamName = teamData.map((data) => data.name);

  const handleCModalOpen = () => {
    dispatch(setModalType('C'));
    dispatch(setIsModalOpen(true));
  };
  const handleDayClick = () => {
    dispatch(setIsDayClick(false));
  };
  return (
    <S.Header isDayClick={isDayClick}>
      {isDayClick ? (
        <>
          <S.Icon
            onClick={handleDayClick}
            className="material-symbols-outlined"
          >
            arrow_back_ios
          </S.Icon>
          <div style={{ marginLeft: '110px' }}>
            {teamName} | {formattedClickedDate}
          </div>
          <div style={{ marginRight: '16px' }}>
            <Button
              color="primary"
              text="일정 등록"
              onClick={handleCModalOpen}
              padding="7px 28px"
              maxHeight="40px"
            />
          </div>
        </>
      ) : (
        <>
          <div></div>
          <MonthPicker />
          <div style={{ marginRight: '16px' }}>
            <Button
              color="primary"
              text="일정 등록"
              onClick={handleCModalOpen}
              padding="7px 28px"
              maxHeight="40px"
            />
          </div>
        </>
      )}
    </S.Header>
  );
};

const S = {
  Header: styled.div<{ isDayClick: boolean }>`
    width: 1250px;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: ${border.default};
    position: relative;
  `,
  Icon: styled.div`
    margin-left: 0.5rem;
    padding: 0 0.5rem;
    cursor: pointer;
  `,
};

export default ScheduleHeader;
