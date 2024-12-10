import styled from 'styled-components';

interface Team {
  name: string;
  members: TeamMembersData[];
}

interface TeamMembersData {
  name: string;
  userId: string;
}

const TeamList = ({ name, members }: Team) => {
  return (
    <S.Ul>
      {name}
      {members.map((member) => (
        <li key={member.userId}>{member.name}</li>
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
