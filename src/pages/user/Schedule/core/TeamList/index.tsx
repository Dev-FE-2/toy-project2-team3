import styled from 'styled-components';

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface Team {
  name: string;
  members: TeamMembersData[];
  setCurrentSchedule: React.Dispatch<React.SetStateAction<CurrentSchedule>>;
}
const TeamList = ({ name, members, setCurrentSchedule }: Team) => {
  const handleTeamOrUserClick = ({ type, teamId, userId }: CurrentSchedule) => {
    setCurrentSchedule({ type, teamId, userId });
  };

  console.log(members);

  return (
    <S.Ul>
      <div
        onClick={() => handleTeamOrUserClick({ type: 'team', teamId: members })}
      >
        {name}
      </div>
      {members.map((member) => (
        <li
          onClick={() =>
            handleTeamOrUserClick({
              type: 'user',
              teamId: members,
              userId: member.userId,
            })
          }
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
