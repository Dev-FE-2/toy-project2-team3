import styled from 'styled-components';
import { border, padding } from '../../../../../../../styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../../../state/store';
import type {
  CurrentSchedule,
  FormattedUserOrTeamScheduleData,
  ScheduleData,
} from '../../../../../../../types/schedule';
import { useSchedule } from '../../../../../../../hooks/useSchedule';
import { assignColor } from '../../../../../../../utils';

interface MainCalendarDaysSchedulesProps {
  day: number;
}

const MainCalendarDaysSchedules = ({ day }: MainCalendarDaysSchedulesProps) => {
  const { currentMonth, currentYear, currentSchedule } = useSelector(
    (state: RootState) => state.schedule
  );
  const [userScheduleData, setUserScheduleData] = useState<
    FormattedUserOrTeamScheduleData[]
  >([]);
  const [teamScheduleData, setTeamScheduleData] = useState<
    FormattedUserOrTeamScheduleData[]
  >([]);
  const { scheduleData = [] } = useSchedule();

  useEffect(() => {
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
  }, [currentSchedule, scheduleData]);

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
    if (!currentSchedule.teamId) return [];

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
