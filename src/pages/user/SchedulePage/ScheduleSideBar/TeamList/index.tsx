import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCurrentSchedule } from '../../../../../slices/schedule/scheduleSlice';
import type {
  CurrentSchedule,
  TeamMembersData,
} from '../../../../../types/schedule';
import { assignColor } from '../../../../../utils/assignColor';

interface TeamListProps {
  name: string;
  members: TeamMembersData[];
}

const TeamList = ({ name, members }: TeamListProps) => {
  const dispatch = useDispatch();

  const handleTeamOrUserClick = ({ type, teamId, userId }: CurrentSchedule) => {
    dispatch(setCurrentSchedule({ type, teamId, userId }));
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
      margin: 14px 0;
      display: flex;
      align-items: center;
      line-height: 1;
    }
  `,
  NumberCircle: styled.div<{
    assignedBackgroundColor: string;
    assignedBorderColor: string;
  }>`
    margin: 2px 4px 0 0;
    background-color: ${(props) => props.assignedBackgroundColor};
    border: 1px solid ${(props) => props.assignedBorderColor};
    width: 15px;
    height: 15px;
    border-radius: 50%;
  `,
};

export default TeamList;
