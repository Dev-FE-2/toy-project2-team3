import styled from 'styled-components';
import { border, padding } from '../../../../../../../../styles';
import { fetchDataFromDB } from '../../../../../../../../firebase/fetchDataFromDB';
import { useCallback, useEffect, useState } from 'react';

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
  currentYear: number;
  currentMonth: number;
  day: number;
}

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

const MainCalendarDaysSchedules = ({
  currentSchedule,
  currentYear,
  currentMonth,
  day,
}: MainCalendarDaysSchedulesProps) => {
  const [userScheduleData, setUserScheduleData] = useState<
    FormattedUserOrTeamScheduleData[]
  >([]);
  const [teamScheduleData, setTeamScheduleData] = useState<
    FormattedUserOrTeamScheduleData[]
  >([]);

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

  const formatUserSchedule = (
    currentSchedule: CurrentSchedule,
    scheduleData: ScheduleData[]
  ) => {
    const userScheduleData = scheduleData.find(
      (schedule) => schedule.userId === currentSchedule.userId
    );

    const userInfo = currentSchedule.teamId.find((id) =>
      userScheduleData ? id.userId === userScheduleData.userId : ''
    );

    const userName = userInfo ? userInfo.name : '';

    const formattedUserSchedule = userScheduleData
      ? [
          {
            type: currentSchedule.type,
            name: userName,
            ...userScheduleData,
          },
        ]
      : [];

    return formattedUserSchedule;
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
    // setScheduleData(fetchedScheduleData);

    if (currentSchedule.type === 'user') {
      const userScheduleData = formatUserSchedule(
        currentSchedule,
        fetchedScheduleData
      );
      setUserScheduleData(userScheduleData);
    } else {
      const teamScheduleData = formatTeamSchedule(
        currentSchedule,
        fetchedScheduleData
      );
      setTeamScheduleData(teamScheduleData);
    }
  }, [currentSchedule]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const isDateInRange = (currentDate: Date, startedAt: Date, endedAt: Date) => {
    return (
      currentDate.toDateString() === startedAt.toDateString() ||
      currentDate.toDateString() === endedAt.toDateString() ||
      (currentDate > startedAt && currentDate < endedAt)
    );
  };

  const renderScheduleData = (
    scheduleData: FormattedUserOrTeamScheduleData
  ) => {
    return scheduleData.scheduleList
      .filter((data) => {
        const startDate = new Date(data.startedAt);
        const endDate = new Date(data.endedAt);
        const currentDate = new Date(currentYear, currentMonth - 1, day);

        return isDateInRange(currentDate, startDate, endDate);
      })
      .map((data) => (
        <S.MainCalendarDaysContents key={data.title}>
          {`${scheduleData.name}: ${data.title}`}
        </S.MainCalendarDaysContents>
      ));
  };

  return (
    <>
      {currentSchedule.type === 'team'
        ? teamScheduleData.flatMap((scheduleData) =>
            renderScheduleData(scheduleData)
          )
        : userScheduleData.flatMap((scheduleData) =>
            renderScheduleData(scheduleData)
          )}
    </>
  );
};

const S = {
  MainCalendarDaysContents: styled.div`
    width: 95%;
    height: auto;
    min-height: 21px;
    font-size: 12px;
    border: ${border.default};
    border-radius: ${border.radius.xs};
    padding: 0 ${padding.xs};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export default MainCalendarDaysSchedules;
