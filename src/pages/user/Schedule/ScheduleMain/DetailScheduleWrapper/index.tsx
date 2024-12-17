import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { border, colors } from '../../../../../styles';
import DetailSchedule from './DetailSchedule';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../state/store';
import type { TeamMembersData } from '../../../../../types/schedule';

const DetailScheduleWrapper = () => {
  const { currentSchedule, clickedDate } = useSelector(
    (state: RootState) => state.schedule
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  const teamMembersInfo = currentSchedule.teamId;
  const teamMembersLength = teamMembersInfo.length;

  const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const timeLinePosition = (totalMinutes / 60) * 120 + 40;

  const [year, month, day] = clickedDate;
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedClickedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const currentDate = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`;

  useEffect(() => {
    const getCurrentTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(getCurrentTime);
  }, []);

  const generateCells = (teamMembers: TeamMembersData[]) => {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour: hour.toString().padStart(2, '0'),
      cells: teamMembers.map((member) => ({ member, hour })),
    }));
  };

  return (
    <>
      <S.ScheduleContainer teamMembersLength={teamMembersLength}>
        <S.Cell type={'header'}>
          <div className="material-symbols-outlined">schedule</div>
        </S.Cell>
        {teamMembersInfo.map((member) => (
          <S.Cell type={'header'} key={member.userId}>
            {member.name}
          </S.Cell>
        ))}
        {generateCells(teamMembersInfo).map(({ hour, cells }) => (
          <S.CellsContainer key={hour}>
            <S.Cell type={'time'}>{hour}</S.Cell>
            {cells.map(({ member }) => (
              <S.Cell type={''} key={`${member.userId}-${hour}`} />
            ))}
          </S.CellsContainer>
        ))}
        <DetailSchedule
          formattedClickedDate={formattedClickedDate}
          teamMembersLength={teamMembersLength}
        />
        {formattedClickedDate === currentDate && (
          <S.CurrentTimeLine style={{ top: `${timeLinePosition}px` }} />
        )}
      </S.ScheduleContainer>
    </>
  );
};

const S = {
  ScheduleContainer: styled.div<{ teamMembersLength: number }>`
    width: 1250px;
    max-height: calc(80% - 3rem);
    display: grid;
    grid-template-columns: auto repeat(
        ${(props) => props.teamMembersLength},
        1fr
      );
    grid-template-rows: auto repeat(24, 1fr);
    border: ${border.default};
    overflow-y: auto;
    position: relative;
  `,
  CellsContainer: styled.div`
    display: contents;
  `,
  Cell: styled.div<{ type: string }>`
    border: ${border.default};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    ${(props) =>
      props.type === 'header' &&
      `
        background-color: ${colors.semantic.background.light};
        font-weight: bold;
        height: 40px;
        position: sticky;
        top: 0;
        z-index: 2;
        `}
    ${(props) =>
      props.type === 'time' &&
      `
        height: 120px;
        width: 40px;
        font-weight: bold;
        background-color: ${colors.semantic.background.light};
        `}
  `,
  CurrentTimeLine: styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 1240px;
    height: 2px;
    background-color: ${colors.semantic.danger};
    z-index: 5;
  `,
};
export default DetailScheduleWrapper;
