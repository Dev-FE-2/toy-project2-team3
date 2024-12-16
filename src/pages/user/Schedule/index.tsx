import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import { useEffect } from 'react';
import { fetchDataFromDB } from '../../../firebase/fetchDataFromDB';
import ScheduleModal from './core/ScheduleModal';
import { useFetchUserInfo } from '../../../hooks';
import { Loading } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import {
  setCurrentSchedule,
  setScheduleData,
  setTeamData,
} from '../../../slices/schedule/scheduleSlice';
import { ScheduleData, TeamData, TeamMembersData } from './core/schedule';

const Schedule = () => {
  const dispatch = useDispatch();
  const { teamData, isModalOpen } = useSelector(
    (state: RootState) => state.schedule
  );
  const { userInfo, isLoading, error } = useFetchUserInfo();

  useEffect(() => {
    const fetchInitialScheduleData = async () => {
      const scheduleData = (await fetchDataFromDB({
        table: 'Schedule',
      })) as ScheduleData[];
      dispatch(setScheduleData(scheduleData));
    };

    fetchInitialScheduleData();
  }, [dispatch]);

  const getTeamsData = async () => {
    const teamsData = (await fetchDataFromDB({ table: 'Teams' })) as TeamData[];

    dispatch(setTeamData(teamsData));

    console.log(teamsData);

    return teamsData;
  };

  const getCurrentUserTeamsData = () => {
    const currentUserTeams = teamData.find((team) =>
      team.members.some(
        (member) => userInfo && member.userId === userInfo.userId
      )
    )?.members as TeamMembersData[];

    dispatch(
      setCurrentSchedule({
        type: 'team',
        teamId: currentUserTeams,
        userId: '',
      })
    );
  };

  useEffect(() => {
    getCurrentUserTeamsData();
  }, [userInfo]);

  useEffect(() => {
    getTeamsData();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <>
      <S.Wrapper>
        <ScheduleSideBar />
        <div>
          <ScheduleHeader />
          <ScheduleMain />
        </div>
        {isModalOpen && <ScheduleModal />}
      </S.Wrapper>
    </>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    width: 1440px;
    height: 900px;
  `,
};

export default Schedule;
