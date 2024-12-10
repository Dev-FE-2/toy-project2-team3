import styled from 'styled-components';
import TeamList from '../core/TeamList';
import { border } from '../../../../styles';
import { TEAMS } from '../constants';

interface ScheduleSideBarProps {
  isSixWeek: boolean;
}

const ScheduleSideBar = ({ isSixWeek }: ScheduleSideBarProps) => {
  return (
    <S.Wrapper isSixWeek={isSixWeek}>
      <S.Content>
        {TEAMS.map((team) => (
          <TeamList key={team.name} name={team.name} members={team.members} />
        ))}
      </S.Content>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div<{ isSixWeek: boolean }>`
    border: ${border.default};
    width: 190px;
    height: ${(prop) => (prop.isSixWeek ? '95%' : '80%')};
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
