import styled from 'styled-components';
import TeamList from '../core/TeamList';
import { border } from '../../../../styles';

const teams = [
  {
    name: '응급 1팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
  {
    name: '응급 2팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
  {
    name: '응급 3팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
  {
    name: '응급 4팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
  {
    name: '응급 5팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
  {
    name: '응급 6팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
  {
    name: '응급 7팀',
    members: ['김하나', '김둘둘', '김셋셋', '김넷넷', '김다섯', '김여섯'],
  },
];

interface ScheduleSideBarProps {
  isSixWeek: boolean;
}

const ScheduleSideBar = ({ isSixWeek }: ScheduleSideBarProps) => {
  return (
    <S.Wrapper isSixWeek={isSixWeek}>
      <S.Content>
        {teams.map((team) => (
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
