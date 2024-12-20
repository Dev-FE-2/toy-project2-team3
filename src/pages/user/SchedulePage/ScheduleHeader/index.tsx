import styled from 'styled-components';
import MonthPicker from './MonthPicker';
import { border } from '../../../../styles';
import Button from '../../../../components/form/Button';
import type { RootState } from '../../../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsDayClick,
  setIsModalOpen,
  setModalType,
} from '../../../../slices/schedule/scheduleSlice';
import { useTeam } from '../../../../hooks/useTeam';
import { formatDate } from '../../../../utils/formatDate';

const ScheduleHeader = () => {
  const dispatch = useDispatch();
  const { isDayClick, clickedDate, currentSchedule } = useSelector(
    (state: RootState) => state.schedule
  );
  const { teamData } = useTeam();
  const teamName = teamData
    .filter((data) => data.members === currentSchedule.teamId)
    .map((d) => d.name);
  const formattedClickedDate = formatDate(clickedDate);

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
