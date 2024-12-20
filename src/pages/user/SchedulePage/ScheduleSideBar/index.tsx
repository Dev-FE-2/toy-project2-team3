import styled from 'styled-components';
import TeamList from './TeamList';
import { border } from '../../../../styles';
import type { RootState } from '../../../../state/store';
import { useSelector } from 'react-redux';
import { useTeam } from '../../../../hooks/useTeam';

const ScheduleSideBar = () => {
  const { isSixWeek, isDayClick } = useSelector(
    (state: RootState) => state.schedule
  );
  const { teamData } = useTeam();

  const SIDEBAR_HEIGHT_STATUS = isSixWeek && !isDayClick;

  return (
    <S.Wrapper sideBarHeightStatus={SIDEBAR_HEIGHT_STATUS}>
      <S.Content>
        {teamData.map((team) => (
          <TeamList key={team.id} name={team.name} members={team.members} />
        ))}
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ sideBarHeightStatus: boolean }>`
    border: ${border.default};
    width: 190px;
    height: ${(prop) => (prop.sideBarHeightStatus ? '95%' : '80%')};
    padding: 1rem 0;
  `,
  Content: styled.div`
    padding-left: 0.5rem;
    min-width: 140px;
    overflow-y: auto;
    height: 100%;
  `,
};

export default ScheduleSideBar;
