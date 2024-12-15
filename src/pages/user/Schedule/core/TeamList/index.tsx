import styled from 'styled-components';
import { colors } from '../../../../../styles';

interface TeamMembersData {
  name: string;
  userId: string;
  number: number;
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

  const assignColor = (number: number, type: string) => {
    const colorSaturation = type === 'background' ? 's95' : 's60';
    const color = [
      colors.scale.secondary[colorSaturation],
      colors.scale.tertiary[colorSaturation],
      colors.scale.neutral[colorSaturation],
      colors.scale.primary[colorSaturation],
      colors.scale.danger[colorSaturation],
    ];

    const assingedColor = color[number % 5];

    return assingedColor;
  };

  return (
    <S.Ul>
      <div
        onClick={() => handleTeamOrUserClick({ type: 'team', teamId: members })}
      >
        {name}
      </div>
      {members.map((member) => {
        const assignedBackgroundColor = assignColor(
          member.number,
          'background'
        );
        const assignedBorderColor = assignColor(member.number, 'border');

        return (
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
            <S.NumberCircle
              assignedBackgroundColor={assignedBackgroundColor}
              assignedBorderColor={assignedBorderColor}
            ></S.NumberCircle>
            {member.name}
          </li>
        );
      })}
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
      font-weight: 500;
      padding-left: 1rem;
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
    }
  `,
  NumberCircle: styled.div<{
    assignedBackgroundColor: string;
    assignedBorderColor: string;
  }>`
    margin-right: 4px;
    background-color: ${(props) => props.assignedBackgroundColor};
    border: 1px solid ${(props) => props.assignedBorderColor};
    width: 15px;
    height: 15px;
    border-radius: 50%;
  `,
};

export default TeamList;
