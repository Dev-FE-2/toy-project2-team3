import styled from 'styled-components';
import { border, padding } from '../../../../../../../styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../../../state/store';
import type { FormattedUserOrTeamScheduleData } from '../../../../../../../types/schedule';
import { useSchedule } from '../../../../../../../hooks/useSchedule';
import { assignColor } from '../../../../../../../utils';
import { formatUserSchedule } from '../../../../../../../utils/formatUserSchedule';
import { formatTeamSchedule } from '../../../../../../../utils/formatTeamSchedule';

interface MainCalendarDaysSchedulesProps {
  day: number;
}

const MainCalendarDaysSchedules = ({ day }: MainCalendarDaysSchedulesProps) => {
  const { currentMonth, currentYear, currentSchedule } = useSelector(
    (state: RootState) => state.schedule
  );
  const { scheduleData = [] } = useSchedule();

  const teamOrUserscheduleData = useMemo(() => {
    return currentSchedule.type === 'user'
      ? formatUserSchedule(currentSchedule, scheduleData)
      : formatTeamSchedule(currentSchedule, scheduleData);
  }, [currentSchedule, scheduleData]);

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
      {teamOrUserscheduleData.flatMap((scheduleData) =>
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
    font-size: 14px;
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
