import styled from 'styled-components';

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  id: string;
}

interface Team {
  teamId: string;
  name: string;
  members: TeamMembersData[];
  setCurrentSchedule: React.Dispatch<React.SetStateAction<CurrentSchedule>>;
}
const TeamList = ({ teamId, name, members, setCurrentSchedule }: Team) => {
  const handleTeamOrUserClick = (type: string, id: string) => {
    setCurrentSchedule({ type, id });
  };

  return (
    <S.Ul>
      <div onClick={() => handleTeamOrUserClick('team', teamId)}>{name}</div>
      {members.map((member) => (
        <li
          onClick={() => handleTeamOrUserClick('user', member.userId)}
          key={member.userId}
        >
          {member.name}
        </li>
      ))}
    </S.Ul>
  );
};

const S = {
  Ul: styled.ul`
    list-style-type: none;
    font-size: 1.25rem;
    font-weight: 700;
    padding-left: 1rem;
    cursor: pointer;

    li {
      font-size: 1rem;
      font-weight: 400;
      padding-left: 1rem;
      margin: 0.5rem 0;
    }
  `,
};

export default TeamList;
