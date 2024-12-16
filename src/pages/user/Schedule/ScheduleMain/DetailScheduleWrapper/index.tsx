import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { border, colors } from '../../../../../styles';
import DetailSchedule from './DetailSchedule';
import { fetchDataFromDB } from '../../../../../firebase';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../state/store';
import type {
  CurrentSchedule,
  FormattedUserOrTeamScheduleData,
  ScheduleData,
  TeamMembersData,
} from '../../../../../types/schedule';

const DetailScheduleWrapper = () => {
  const { currentSchedule, clickedDate, scheduleData } = useSelector(
    (state: RootState) => state.schedule
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clickedDateTeamScheduleData, setClickedDateTeamScheduleData] =
    useState<FormattedUserOrTeamScheduleData[]>([]);

  const TEAM_MEMBERS_INFO = currentSchedule.teamId;
  const TEAM_MEMBERS_LENGTH = TEAM_MEMBERS_INFO.length;
  const HOURS = currentTime.getHours();
  const MINUTES = currentTime.getMinutes();
  const TOTAL_MINUTES = HOURS * 60 + MINUTES;
  const TIME_LINE_POSITION = (TOTAL_MINUTES / 60) * 120 + 40;

  const [year, month, day] = clickedDate;
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedClickedDate = `${year}-${formattedMonth}-${formattedDay}`;

  const currentDate = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`;

  useEffect(() => {
    const teamScheduleData = formatTeamSchedule(currentSchedule, scheduleData);
    const filteredScheduleData = teamScheduleData.filter((schedule) =>
      schedule.scheduleList.some((item) =>
        filterClickedDateTeamSchedule(item.startedAt, item.endedAt)
      )
    );
    setClickedDateTeamScheduleData(filteredScheduleData);
  }, [currentSchedule, scheduleData]);

  const filterClickedDateTeamSchedule = (
    startedAt: string,
    endedAt: string
  ) => {
    const cuttedStartedAt = startedAt.slice(0, 10);
    const cuttedEndedAt = endedAt.slice(0, 10);

    return (
      formattedClickedDate === cuttedStartedAt ||
      formattedClickedDate === cuttedEndedAt
    );
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

      const filteredScheduleList = schedule.scheduleList.filter((item) =>
        filterClickedDateTeamSchedule(item.startedAt, item.endedAt)
      );

      return {
        ...schedule,
        type: currentSchedule.type,
        name: teamMemberInfo ? teamMemberInfo.name : '',
        number: teamMemberInfo ? teamMemberInfo.number : 0,
        scheduleList: filteredScheduleList,
      };
    });

    return formattedTeamSchedule.filter(
      (schedule) => schedule.scheduleList.length > 0
    );
  };

  const fetchSchedules = useCallback(async () => {
    const scheduleData = (await fetchDataFromDB({
      table: 'Schedule',
    })) as ScheduleData[];

    const teamScheduleData = formatTeamSchedule(currentSchedule, scheduleData);
    const filteredScheduleData: FormattedUserOrTeamScheduleData[] =
      teamScheduleData.filter((schedule) =>
        schedule.scheduleList.some((item) =>
          filterClickedDateTeamSchedule(item.startedAt, item.endedAt)
        )
      );

    setClickedDateTeamScheduleData(filteredScheduleData);
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  useEffect(() => {
    const getCurrentTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(getCurrentTime);
  }, []);

  const generateCells = (teamMembers: TeamMembersData[]) => {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour: hour.toString().padStart(2, '0'),
      cells: teamMembers.map((member) => ({ member, hour })),
    }));
  };

  return (
    <>
      <S.ScheduleContainer teamMembersLength={TEAM_MEMBERS_LENGTH}>
        <S.Cell type={'header'}>
          <div className="material-symbols-outlined">schedule</div>
        </S.Cell>
        {TEAM_MEMBERS_INFO.map((member) => (
          <S.Cell type={'header'} key={member.userId}>
            {member.name}
          </S.Cell>
        ))}
        {generateCells(TEAM_MEMBERS_INFO).map(({ hour, cells }) => (
          <S.CellsContainer key={hour}>
            <S.Cell type={'time'}>{hour}</S.Cell>
            {cells.map(({ member }) => (
              <S.Cell type={''} key={`${member.userId}-${hour}`} />
            ))}
          </S.CellsContainer>
        ))}
        <DetailSchedule
          formattedClickedDate={formattedClickedDate}
          teamMembersLength={TEAM_MEMBERS_LENGTH}
          clickedDateTeamScheduleData={clickedDateTeamScheduleData}
        />
        {formattedClickedDate === currentDate && (
          <S.CurrentTimeLine style={{ top: `${TIME_LINE_POSITION}px` }} />
        )}
      </S.ScheduleContainer>
    </>
  );
};

const S = {
  ScheduleContainer: styled.div<{ teamMembersLength: number }>`
    width: 1250px;
    max-height: calc(80% - 3rem);
    display: grid;
    grid-template-columns: auto repeat(
        ${(props) => props.teamMembersLength},
        1fr
      );
    grid-template-rows: auto repeat(24, 1fr);
    border: ${border.default};
    overflow-y: auto;
    position: relative;
  `,
  CellsContainer: styled.div`
    display: contents;
  `,
  Cell: styled.div<{ type: string }>`
    border: ${border.default};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    ${(props) =>
      props.type === 'header' &&
      `
        background-color: ${colors.semantic.background.light};
        font-weight: bold;
        height: 40px;
        position: sticky;
        top: 0;
        z-index: 2;
        `}
    ${(props) =>
      props.type === 'time' &&
      `
        height: 120px;
        width: 40px;
        font-weight: bold;
        background-color: ${colors.semantic.background.light};
        `}
  `,
  CurrentTimeLine: styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 1240px;
    height: 2px;
    background-color: ${colors.semantic.danger};
    z-index: 5;
  `,
};
export default DetailScheduleWrapper;
