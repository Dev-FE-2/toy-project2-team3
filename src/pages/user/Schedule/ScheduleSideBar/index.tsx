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

const ScheduleSideBar = ({isSixWeek}: ScheduleSideBarProps) => {
  
  return (
    <StyledWrapper>
      <StyledContent>
        {teams.map((team) => (
          <TeamList key={team.name} name={team.name} members={team.members} />
        ))}
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border: ${border.default};
  width: 10rem;
  height: 80dvh;
  padding: 1rem 0;
`;

const StyledContent = styled.div`
  padding-left: 0.5rem;
  width: 9rem;
  overflow-y: auto;
  max-height: calc(80dvh - 2rem);
`;

export default ScheduleSideBar;
