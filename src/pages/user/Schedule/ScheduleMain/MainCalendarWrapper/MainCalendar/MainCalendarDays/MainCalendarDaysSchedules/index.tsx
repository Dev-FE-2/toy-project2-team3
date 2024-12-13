import styled from 'styled-components';
import { border, colors, padding } from '../../../../../../../../styles';
import { fetchDataFromDB } from '../../../../../../../../firebase/fetchDataFromDB';
import { useCallback, useEffect, useState } from 'react';

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
  number: number;
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

    const formattedUserSchedule = userScheduleData
      ? [
          {
            type: currentSchedule.type,
            name: userInfo ? userInfo.name : '',
            number: userInfo ? userInfo.number : 0,
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
        number: teamMemberInfo ? teamMemberInfo.number : 0,
      };
    });

    return formattedTeamSchedule;
  };

  const fetchSchedules = useCallback(async () => {
    const scheduleData = (await fetchDataFromDB({
      table: 'Schedule',
    })) as ScheduleData[];
    if (currentSchedule.type === 'user') {
      const userScheduleData = formatUserSchedule(
        currentSchedule,
        scheduleData
      );
      setUserScheduleData(userScheduleData);
    } else {
      const teamScheduleData = formatTeamSchedule(
        currentSchedule,
        scheduleData
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

  const renderScheduleData = (
    scheduleData: FormattedUserOrTeamScheduleData
  ) => {
    const assignedBackgroundColor = assignColor(
      scheduleData.number,
      'background'
    );
    const assignedBorderColor = assignColor(scheduleData.number, 'border');

    return scheduleData.scheduleList
      .filter((data) => {
        const startDate = new Date(data.startedAt);
        const endDate = new Date(data.endedAt);
        const currentDate = new Date(currentYear, currentMonth - 1, day);

        return isDateInRange(currentDate, startDate, endDate);
      })
      .map((data) => (
        <S.MainCalendarDaysContents
          assignedBackgroundColor={assignedBackgroundColor}
          assignedBorderColor={assignedBorderColor}
          key={data.title}
        >
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
  MainCalendarDaysContents: styled.div<{
    assignedBackgroundColor: string;
    assignedBorderColor: string;
  }>`
    width: 95%;
    height: auto;
    min-height: 21px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${(props) => props.assignedBackgroundColor};
    border: 1px solid ${(props) => props.assignedBorderColor};
    border-radius: ${border.radius.xs};
    padding: 0 ${padding.xs};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};

export default MainCalendarDaysSchedules;
