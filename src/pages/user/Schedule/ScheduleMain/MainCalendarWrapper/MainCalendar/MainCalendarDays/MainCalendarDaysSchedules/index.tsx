import styled from 'styled-components';
import { border } from '../../../../../../../../styles';
import { fetchDataFromDB } from '../../../../../../../../firebase/fetchDataFromDB';
import { useEffect } from 'react';

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

interface MainCalendarDaysSchedulesProps {
  currentSchedule: CurrentSchedule;
}

const MainCalendarDaysSchedules = ({
  currentSchedule,
}: MainCalendarDaysSchedulesProps) => {
  console.log(currentSchedule);

  const getScheduleData = async () => {
    const scheduleData = await fetchDataFromDB('Schedule');
    console.log(scheduleData);
    // 📌 스케쥴 데이터를 가져오고 currentSchedule을 이용해서 포맷팅한 스케쥴 데이터를 화면에 뿌려주면 끝!
  };

  useEffect(() => {
    getScheduleData();
  }, []);

  return (
    <S.MainCalendarDaysContents>
      <div>gd</div>
    </S.MainCalendarDaysContents>
  );
};

const S = {
  MainCalendarDaysContents: styled.div`
    width: calc(100% - 0.5rem - 2px);
    min-height: 1rem;
    font-size: 0.875rem;
    border: ${border.default};
    border-radius: ${border.radius.xs};
    padding: 0.125rem 0.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export default MainCalendarDaysSchedules;
