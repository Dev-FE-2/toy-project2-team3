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
  TEAM_MEMBERS_LENGTH: number;
  clickedDateTeamScheduleData: FormattedUserOrTeamScheduleData[];
}

const DetailSchedule = ({
  TEAM_MEMBERS_LENGTH,
  clickedDateTeamScheduleData,
}: DetailSchedulProps) => {
  const SCHEDULE_GRID_WIDTH = (1250 - 40) / TEAM_MEMBERS_LENGTH - 0.3;

  const calculatePosition = (startedAt: string, endedAt: string) => {
    const startDate = new Date(startedAt);
    const endDate = new Date(endedAt);

    const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
    const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();

    const top = startMinutes * 2;
    const height = (endMinutes - startMinutes) * 2;

    return { top, height };
  };

  return (
    <>
      {clickedDateTeamScheduleData.map((schedule) =>
        schedule.scheduleList.map((item) => {
          const startDate = new Date(item.startedAt);
          const endDate = new Date(item.endedAt);
          const startDay = startDate.toISOString().slice(0, 10);
          const endDay = endDate.toISOString().slice(0, 10);

          if (startDay === endDay) {
            // 같은 날인 경우
            const { top, height } = calculatePosition(
              item.startedAt,
              item.endedAt
            );
            return (
              <S.TempBox
                scheduleGridWidth={SCHEDULE_GRID_WIDTH}
                memberNumber={schedule.number}
                top={top}
                height={height}
                key={schedule.id}
              >
                <div key={item.title}>
                  <p>{item.title}</p>
                  <p>{item.detail}</p>
                </div>
              </S.TempBox>
            );
          } else {
            // 첫 번째 TempBox: 시작일의 남은 시간
            const endOfDay = new Date(startDate);
            endOfDay.setHours(23, 59, 59, 999); // 23:59:59.999로 설정
            const { top: top1, height: height1 } = calculatePosition(
              item.startedAt,
              endOfDay.toISOString()
            );

            // 두 번째 TempBox: 다음 날의 시작 시간
            const { top: top2, height: height2 } = calculatePosition(
              startDay + 'T00:00:00Z',
              item.endedAt
            );

            return (
              <>
                <S.TempBox
                  scheduleGridWidth={SCHEDULE_GRID_WIDTH}
                  memberNumber={schedule.number}
                  top={top1}
                  height={height1}
                  key={`${schedule.id}-1`}
                >
                  <div key={item.title}>
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                </S.TempBox>
                <S.TempBox
                  scheduleGridWidth={SCHEDULE_GRID_WIDTH}
                  memberNumber={schedule.number}
                  top={top2}
                  height={height2}
                  key={`${schedule.id}-2`}
                >
                  <div key={item.title}>
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                </S.TempBox>
              </>
            );
          }
        })
      )}
    </>
  );
};

const S = {
  TempBox: styled.div<{
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
