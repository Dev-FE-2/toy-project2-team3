import styled from 'styled-components';
import { fetchDataFromDB } from '../../../../../../firebase/fetchDataFromDB';
import { useCallback, useEffect, useState } from 'react';

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
  title: string;
  updatedAt: string;
}

interface ScheduleData {
  id: string;
  scheduleList: ScheduleList[];
  userId: string;
}

interface FormattedUserOrTeamScheduleData extends ScheduleData {
  type: string;
  name: string;
}

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
  const [teamScheduleData, setTeamScheduleData] = useState<
    FormattedUserOrTeamScheduleData[]
  >([]);

  console.log(clickedDate); // 삭제 예정
  console.log(teamScheduleData); // 삭제 예정

  const getScheduleData = async () => {
    const scheduleData = await fetchDataFromDB('Schedule');

    const formattedScheduleData: ScheduleData[] = scheduleData
      ? Object.entries(scheduleData).map(([id, scheduleData]) => ({
          id,
          scheduleList: scheduleData.scheduleList,
          userId: scheduleData.userId,
        }))
      : [];

    return formattedScheduleData;
  };

  const formatTeamSchedule = (
    currentSchedule: CurrentSchedule,
    scheduleData: ScheduleData[]
  ) => {
    const teamMembersUserId = currentSchedule.teamId.map((id) => id.userId);
    const teamScheduleData = scheduleData.filter((schedule) =>
      teamMembersUserId.includes(schedule.userId)
    );

    const formattedTeamSchedule = teamScheduleData.map((schedule) => {
      const teamMemberInfo = currentSchedule.teamId.find(
        (info) => info.userId === schedule.userId
      );

      return {
        ...schedule,
        type: currentSchedule.type,
        name: teamMemberInfo ? teamMemberInfo.name : '',
      };
    });

    return formattedTeamSchedule;
  };

  const fetchSchedules = useCallback(async () => {
    const fetchedScheduleData = await getScheduleData();

    const teamScheduleData = formatTeamSchedule(
      currentSchedule,
      fetchedScheduleData
    );
    setTeamScheduleData(teamScheduleData);
  }, [currentSchedule]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);
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
