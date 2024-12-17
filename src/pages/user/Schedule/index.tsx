import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import ScheduleModal from './core/ScheduleModal';
import { useFetchUserInfo } from '../../../hooks';
import { Loading } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../state/store';
import {
  setCurrentSchedule,
  setScheduleData,
  setTeamData,
} from '../../../slices/schedule/scheduleSlice';
import type {
  ScheduleData,
  TeamData,
  TeamMembersData,
} from '../../../types/schedule';
import useSWR from 'swr';
import { COLLECTION_NAME } from '../../../constant';

const Schedule = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state: RootState) => state.schedule);
  const {
    userInfo,
    isLoading: isUserFetchLoading,
    error: userFetchError,
  } = useFetchUserInfo();
  const { error: isShceduleFetchLoading, isLoading: scheduleFetchError } =
    useSWR<ScheduleData[]>(
      { table: COLLECTION_NAME.schedule },
      { onSuccess: (data) => dispatch(setScheduleData(data)) }
    );
  const { error: isTeamFetchLoading, isLoading: teamFetchError } = useSWR<
    TeamData[]
  >(
    { table: COLLECTION_NAME.teams },
    {
      onSuccess: (data) => {
        dispatch(setTeamData(data));
        getCurrentUserTeamsData(data);
      },
    }
  );

  const isLoading =
    isUserFetchLoading || isShceduleFetchLoading || isTeamFetchLoading;
  const hasError = userFetchError || scheduleFetchError || teamFetchError;

  const getCurrentUserTeamsData = (teamData: TeamData[]) => {
    if (teamData) {
      const currentUserTeams = teamData.find((team) =>
        team.members.some(
          (member) => userInfo && member.userId === userInfo.userId
        )
      )?.members as TeamMembersData[];

      dispatch(
        setCurrentSchedule({
          type: 'team',
          teamId: currentUserTeams && currentUserTeams,
          userId: '',
        })
      );
    }
  };

  if (isLoading) return <Loading />;
  if (hasError) return <div>오류 발생</div>;

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
