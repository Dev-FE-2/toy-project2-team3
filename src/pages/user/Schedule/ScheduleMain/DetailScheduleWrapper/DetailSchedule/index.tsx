import styled from 'styled-components';

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
  title: string;
  updatedAt: string;
}

interface FormattedUserOrTeamScheduleData {
  id: string;
  scheduleList: ScheduleList[];
  userId: string;
  type: string;
  name: string;
  number: number;
}

interface DetailSchedulProps {
  formattedClickedDate: string;
  TEAM_MEMBERS_LENGTH: number;
  clickedDateTeamScheduleData: FormattedUserOrTeamScheduleData[];
}

const DetailSchedule = ({
  formattedClickedDate,
  TEAM_MEMBERS_LENGTH,
  clickedDateTeamScheduleData,
}: DetailSchedulProps) => {
  const SCHEDULE_GRID_WIDTH = (1250 - 40) / TEAM_MEMBERS_LENGTH - 0.3;

  const calculatePosition = (startedAt: string, endedAt: string) => {
    const cuttedStartedAt = startedAt.slice(0, 10);
    const cuttedEndedAt = endedAt.slice(0, 10);

    const startDate = new Date(startedAt);
    const endDate = new Date(endedAt);

    let top = 0;
    let height = 0;

    // startedAt === formattedClickedDate === endedAt
    if (
      cuttedStartedAt === formattedClickedDate &&
      cuttedEndedAt === formattedClickedDate
    ) {
      const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
      const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();

      top = startMinutes * 2;
      height = (endMinutes - startMinutes) * 2;
    }
    // startedAt === formattedClickedDate !== endedAt
    else if (
      cuttedStartedAt === formattedClickedDate &&
      cuttedEndedAt !== formattedClickedDate
    ) {
      const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
      top = startMinutes * 2;
      height = (24 * 60 - startMinutes) * 2;
    }
    // startedAt !== formattedClickedDate === endedAt
    else if (
      cuttedStartedAt !== formattedClickedDate &&
      cuttedEndedAt === formattedClickedDate
    ) {
      const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
      top = 0;
      height = endMinutes * 2;
    }

    return { top, height };
  };

  return (
    <>
      {clickedDateTeamScheduleData.map((schedule) =>
        schedule.scheduleList.map((item) => {
          const { top, height } = calculatePosition(
            item.startedAt,
            item.endedAt
          );
          return (
            <S.ScheduleBox
              scheduleGridWidth={SCHEDULE_GRID_WIDTH}
              memberNumber={schedule.number}
              top={top}
              height={height}
              key={schedule.id}
            >
              <div key={item.createdAt}>
                <p>{item.title}</p>
                <p>{item.detail}</p>
                <p>{item.startedAt}</p>
                <p>{item.endedAt}</p>
              </div>
            </S.ScheduleBox>
          );
        })
      )}
    </>
  );
};

const S = {
  ScheduleBox: styled.div<{
    scheduleGridWidth: number;
    memberNumber: number;
    top: number;
    height: number;
  }>`
    background-color: rgba(125, 111, 444, 0.5);
    border: 1px solid rgb(125, 111, 444);
    border-radius: 16px;
    width: ${(props) => `${props.scheduleGridWidth}px`};
    height: ${(props) => `${props.height}px`};
    position: absolute;
    top: ${(props) => `${props.top + 40}px`};
    left: ${({ scheduleGridWidth, memberNumber }) =>
      `${40 + scheduleGridWidth * memberNumber}px`};
    z-index: 1;
  `,
};

export default DetailSchedule;
