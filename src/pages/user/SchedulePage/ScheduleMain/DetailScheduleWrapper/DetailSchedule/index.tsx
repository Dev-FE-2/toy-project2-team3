import styled from 'styled-components';
import { colors, padding } from '../../../../../../styles';
import type {
  ScheduleList,
  TargetSchedule,
} from '../../../../../../types/schedule';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsModalOpen,
  setModalType,
  setTargetSchedule,
} from '../../../../../../slices/schedule/scheduleSlice';
import type { RootState } from '../../../../../../state/store';
import { useSchedule } from '../../../../../../hooks/useSchedule';
import { assignColor } from '../../../../../../utils';
import { formatTeamSchedule } from '../../../../../../utils/formatTeamSchedule';

interface DetailSchedulProps {
  formattedClickedDate: string;
  teamMembersLength: number;
}

const DetailSchedule = ({
  formattedClickedDate,
  teamMembersLength,
}: DetailSchedulProps) => {
  const dispatch = useDispatch();
  const { currentSchedule } = useSelector((state: RootState) => state.schedule);
  const { scheduleData = [] } = useSchedule();

  const isDateInRange = (startedAt: string, endedAt: string) => {
    const cuttedStartedAt = startedAt.slice(0, 10);
    const cuttedEndedAt = endedAt.slice(0, 10);

    return (
      formattedClickedDate === cuttedStartedAt ||
      formattedClickedDate === cuttedEndedAt
    );
  };

  const filterScheduleData = () => {
    const teamScheduleData = formatTeamSchedule(currentSchedule, scheduleData);
    console.log(teamScheduleData);
    const formattedTeamScheduleData = teamScheduleData.map((schedule) => {
      const filteredScheduleData = schedule.scheduleList.filter((item) =>
        isDateInRange(item.startedAt, item.endedAt)
      );

      return {
        ...schedule,
        scheduleList: filteredScheduleData,
      };
    });

    return formattedTeamScheduleData;
  };

  const handleRModalOpen = (targetSchedule: TargetSchedule) => {
    dispatch(setModalType('R'));
    dispatch(setTargetSchedule(targetSchedule));
    dispatch(setIsModalOpen(true));
  };

  const SCHEDULE_GRID_WIDTH = (1250 - 40) / teamMembersLength - 0.3;

  const calculateSchedulePosition = (startedAt: string, endedAt: string) => {
    const cuttedStartedAt = startedAt.slice(0, 10);
    const cuttedEndedAt = endedAt.slice(0, 10);

    const startDate = new Date(startedAt);
    const endDate = new Date(endedAt);

    let top = 0;
    let height = 0;

    if (
      cuttedStartedAt === formattedClickedDate &&
      cuttedEndedAt === formattedClickedDate
    ) {
      const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
      const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();

      top = startMinutes * 2;
      height = (endMinutes - startMinutes) * 2;
    } else if (
      cuttedStartedAt === formattedClickedDate &&
      cuttedEndedAt !== formattedClickedDate
    ) {
      const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
      top = startMinutes * 2;
      height = (24 * 60 - startMinutes) * 2;
    } else if (
      cuttedStartedAt !== formattedClickedDate &&
      cuttedEndedAt === formattedClickedDate
    ) {
      const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
      top = 0;
      height = endMinutes * 2;
    }

    return { top, height };
  };

  const getTargetSchedule = (
    id: string,
    name: string,
    userId: string,
    scheduleData: ScheduleList
  ) => {
    const targetSchedule = {
      id,
      name,
      userId,
      ...scheduleData,
    };

    handleRModalOpen(targetSchedule);
  };

  return (
    <>
      {filterScheduleData().map((schedule) =>
        schedule.scheduleList.map((item) => {
          const { top, height } = calculateSchedulePosition(
            item.startedAt,
            item.endedAt
          );

          const assignedBackgroundColor = assignColor(
            schedule.number,
            'background'
          );
          const assignedBorderColor = assignColor(schedule.number, 'border');
          return (
            <S.ScheduleBox
              scheduleGridWidth={SCHEDULE_GRID_WIDTH}
              memberNumber={schedule.number}
              top={top}
              height={height}
              assignedBackgroundColor={assignedBackgroundColor}
              assignedBorderColor={assignedBorderColor}
              key={`${schedule.id}-${item.createdAt}`}
              onClick={() =>
                getTargetSchedule(
                  schedule.id,
                  schedule.name,
                  schedule.userId,
                  item
                )
              }
            >
              <div key={item.createdAt}>
                <div className="title">{item.title}</div>
                <div className="detail">{item.detail}</div>
                <div className="document-url">{item.documentName}</div>
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
    assignedBackgroundColor: string;
    assignedBorderColor: string;
  }>`
    color: ${colors.semantic.text.dark};
    padding: ${padding.md};
    background-color: ${(props) => props.assignedBackgroundColor};
    border: 1px solid ${(props) => props.assignedBorderColor};
    border-radius: 16px;
    width: ${(props) => `${props.scheduleGridWidth}px`};
    height: ${(props) => `${props.height}px`};
    position: absolute;
    top: ${(props) => `${props.top + 40}px`};
    left: ${({ scheduleGridWidth, memberNumber }) =>
      `${40 + scheduleGridWidth * memberNumber}px`};
    z-index: 1;
    overflow: hidden;
    text-overflow: ellipsis;

    & div.detail {
      margin: 8px 0;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${(props) => (props.height <= 120 ? '1' : '4')};
      -webkit-box-orient: vertical;
    }

    & .title {
      font-size: 18px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${(props) => (props.height <= 120 ? '1' : '3')};
      -webkit-box-orient: vertical;
    }

    & .document-url {
      margin: 8px 0;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
};

export default DetailSchedule;
