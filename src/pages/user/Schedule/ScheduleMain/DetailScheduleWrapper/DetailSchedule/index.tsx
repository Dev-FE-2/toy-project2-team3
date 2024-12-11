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

interface DetailSchedulProps {
  currentSchedule: CurrentSchedule;
  clickedDate: number[];
}

const DetailSchedule = ({
  currentSchedule,
  clickedDate,
}: DetailSchedulProps) => {
  console.log(currentSchedule);
  console.log(clickedDate);

  return <S.Box>DetailSchedule</S.Box>;
};

const S = {
  Box: styled.div`
    background-color: rgba(125, 111, 444, 0.5);
    border-radius: 16px;
    width: calc((1250px - 40px) / 6);
    height: 80px;
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 10;
  `,
};

export default DetailSchedule;
