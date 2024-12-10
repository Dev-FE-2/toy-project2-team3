import React from 'react';
import styled from 'styled-components';
import { border, colors } from '../../../../../styles';
import { TEAMS } from '../../constants';

const DetailScheduleWrapper: React.FC = () => {
  const TEMP_TEAM_MEMBERS = TEAMS[0].members;

  const TEAM_MEMBERS_LENGTH = TEMP_TEAM_MEMBERS.length;

  const generateCells = (teamMembers: string[]) => {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour: hour.toString().padStart(2, '0'),
      cells: teamMembers.map((member) => ({ member, hour })),
    }));
  };

  return (
    <>
      <S.ScheduleContainer teamMembersLength={TEAM_MEMBERS_LENGTH}>
        <S.HeaderCell>
          <div className="material-symbols-outlined">schedule</div>
        </S.HeaderCell>
        {TEMP_TEAM_MEMBERS.map((member) => (
          <S.HeaderCell key={member}>{member}</S.HeaderCell>
        ))}
        {generateCells(TEMP_TEAM_MEMBERS).map(({ hour, cells }) => (
          <S.CellsContainer key={hour}>
            <S.TimeCell>{hour}</S.TimeCell>
            {cells.map(({ member }) => (
              <S.Cell key={`${member}-${hour}`} />
            ))}
          </S.CellsContainer>
        ))}
      </S.ScheduleContainer>
    </>
  );
};

const S = {
  ScheduleContainer: styled.div<{ teamMembersLength: number }>`
    width: 1250px;
    height: 100%;
    max-height: calc(80dvh - 3rem);
    display: grid;
    grid-template-columns: auto repeat(
        ${(props) => props.teamMembersLength},
        1fr
      );
    grid-template-rows: auto repeat(24, 1fr);
    border: ${border.default};
    overflow-y: auto;
  `,
  HeaderCell: styled.div`
    background-color: ${colors.semantic.background.light};
    border: ${border.default};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    height: 3rem;
    position: sticky;
    top: 0;
    z-index: 2;
  `,
  CellsContainer: styled.div`
    display: contents;
  `,
  Cell: styled.div`
    border: ${border.default};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  `,
  TimeCell: styled.div`
    height: 6rem;
    width: 3rem;
    border: ${border.default};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    background-color: ${colors.semantic.background.light};
  `,
};
export default DetailScheduleWrapper;
