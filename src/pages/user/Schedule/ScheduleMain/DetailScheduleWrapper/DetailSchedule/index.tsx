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
}

interface DetailSchedulProps {
  clickedDateTeamScheduleData: FormattedUserOrTeamScheduleData[];
}

const DetailSchedule = ({
  clickedDateTeamScheduleData,
}: DetailSchedulProps) => {
  return (
    <>
      {clickedDateTeamScheduleData.map((schedule) =>
        schedule.scheduleList.map((item) => (
          <S.TempBox key={schedule.id}>
            <div key={item.title}>
              <p>{item.title}</p>
              <p>{item.detail}</p>
            </div>
          </S.TempBox>
        ))
      )}
    </>
  );
};

const S = {
  // 시작 위치 잡기
  // height = 2px : 1분

  TempBox: styled.div`
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
