import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import ScheduleModal from './common/ScheduleModal';
import { useFetchUserInfo } from '../../../hooks';
import { Loading } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../state/store';
import { setCurrentSchedule } from '../../../slices/schedule/scheduleSlice';
import type { TeamData, TeamMembersData } from '../../../types/schedule';
import { useSchedule } from '../../../hooks/useSchedule';
import { useTeam } from '../../../hooks/useTeam';

const Schedule = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state: RootState) => state.schedule);
  const {
    userInfo,
    isLoading: isUserFetchLoading,
    error: userFetchError,
  } = useFetchUserInfo();
  const { error: isScheduleFetchLoading, isLoading: scheduleFetchError } =
    useSchedule();
  const {
    error: isTeamFetchLoading,
    isLoading: teamFetchError,
    mutate,
  } = useTeam((data: TeamData[]) => {
    if (!userInfo) {
      mutate();
    } else {
      getCurrentUserTeamsData(data);
    }
  });

  const isLoading =
    isUserFetchLoading || isScheduleFetchLoading || isTeamFetchLoading;
  const hasError = userFetchError || scheduleFetchError || teamFetchError;

  const getCurrentUserTeamsData = (teamData: TeamData[]) => {
    if (userInfo) {
      const currentUserTeams = teamData.find((team) =>
        team.members.some((member) => member.userId === userInfo.userId)
      )?.members as TeamMembersData[];

      dispatch(
        setCurrentSchedule({
          type: 'team',
          teamId: currentUserTeams || [],
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
