import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { border, colors } from '../../../../../styles';
import { TEAMS } from '../../constants';

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface DetailScheduleWrapperProps {
  currentSchedule: CurrentSchedule;
}

const DetailScheduleWrapper = ({
  currentSchedule,
}: DetailScheduleWrapperProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const TEMP_TEAM_MEMBERS = TEAMS[0].members;
  const TEAM_MEMBERS_LENGTH = TEMP_TEAM_MEMBERS.length;
  const HOURS = currentTime.getHours();
  const MINUTES = currentTime.getMinutes();
  const TOTAL_MINUTES = HOURS * 60 + MINUTES;
  const TIME_LINE_POSITION = (TOTAL_MINUTES / 60) * 80 + 40;

  console.log(currentSchedule); // 삭제 필요

  useEffect(() => {
    const getCurrentTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(getCurrentTime);
  }, []);

  const generateCells = (teamMembers: string[]) => {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour: hour.toString().padStart(2, '0'),
      cells: teamMembers.map((member) => ({ member, hour })),
    }));
  };

  return (
    <>
      <S.ScheduleContainer teamMembersLength={TEAM_MEMBERS_LENGTH}>
        <S.Cell type={'header'}>
          <div className="material-symbols-outlined">schedule</div>
        </S.Cell>
        {TEMP_TEAM_MEMBERS.map((member) => (
          <S.Cell type={'header'} key={member}>
            {member}
          </S.Cell>
        ))}
        {generateCells(TEMP_TEAM_MEMBERS).map(({ hour, cells }) => (
          <S.CellsContainer key={hour}>
            <S.Cell type={'time'}>{hour}</S.Cell>
            {cells.map(({ member }) => (
              <S.Cell type={''} key={`${member}-${hour}`} />
            ))}
          </S.CellsContainer>
        ))}
        <S.CurrentTimeLine style={{ top: `${TIME_LINE_POSITION}px` }} />
      </S.ScheduleContainer>
    </>
  );
};

const S = {
  ScheduleContainer: styled.div<{ teamMembersLength: number }>`
    width: 1250px;
    max-height: calc(80dvh - 3rem);
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
        height: 80px;
        width: 3rem;
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
