import styled from 'styled-components';
import { colors, padding } from '../../../../../../styles';

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

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
  documentName: string;
  documentUrl: string;
  title: string;
  updatedAt: string;
}

interface TargetSchedule extends ScheduleList {
  id: string;
  index: number;
  name: string;
  userId: string;
  documentName: string;
  documentUrl: string;
}

interface DetailSchedulProps {
  formattedClickedDate: string;
  TEAM_MEMBERS_LENGTH: number;
  clickedDateTeamScheduleData: FormattedUserOrTeamScheduleData[];
  handleRModalOpen: (targetSchedule: TargetSchedule) => void;
}

const DetailSchedule = ({
  formattedClickedDate,
  TEAM_MEMBERS_LENGTH,
  clickedDateTeamScheduleData,
  handleRModalOpen,
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

  const getTargetSchedule = (
    id: string,
    index: number,
    name: string,
    userId: string,
    scheduleData: ScheduleList
  ) => {
    const targetSchedule = {
      id,
      index,
      name,
      userId,
      ...scheduleData,
    };

    handleRModalOpen(targetSchedule);

    console.log(targetSchedule);
  };

  return (
    <>
      {clickedDateTeamScheduleData.map((schedule) =>
        schedule.scheduleList.map((item, index) => {
          const { top, height } = calculatePosition(
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
              key={`${schedule.id}-${index}`}
              onClick={() =>
                getTargetSchedule(
                  schedule.id,
                  index,
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
                {/* <div className='documentUrl'>{item.documentUrl}</div> */}
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
