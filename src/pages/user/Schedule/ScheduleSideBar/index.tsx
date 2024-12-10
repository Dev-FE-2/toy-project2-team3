import styled from 'styled-components';
import TeamList from '../core/TeamList';
import { border } from '../../../../styles';

interface TeamData {
  id: string;
  name: string;
  members: TeamMembersData[];
}

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface ScheduleSideBarProps {
  isSixWeek: boolean;
  isDayClick: boolean;
  teamData: TeamData[];
  setCurrentSchedule: React.Dispatch<React.SetStateAction<CurrentSchedule>>;
}

const ScheduleSideBar = ({
  isSixWeek,
  isDayClick,
  teamData,
  setCurrentSchedule,
}: ScheduleSideBarProps) => {
  const SIDEBAR_HEIGHT_STATUS = isSixWeek && !isDayClick;

  return (
    <S.Wrapper sideBarHeightStatus={SIDEBAR_HEIGHT_STATUS}>
      <S.Content>
        {teamData.map((team) => (
          <TeamList
            key={team.id}
            name={team.name}
            members={team.members}
            setCurrentSchedule={setCurrentSchedule}
          />
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
