import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import { useEffect, useState } from 'react';
import { fetchDataFromDB } from '../../../firebase/fetchDataFromDB';
import ScheduleModal from './core/ScheduleModal';
import { useFetchUserInfo } from '../../../hooks';
import { Loading } from '../../../components';

interface TeamData {
  id: string;
  name: string;
  members: TeamMembersData[];
}

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

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
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

type ModalType = 'C' | 'R' | 'U' | 'D';

const Schedule = () => {
  const [targetSchedule, setTargetSchedule] = useState<TargetSchedule>({
    id: '',
    index: 0,
    createdAt: '',
    detail: '',
    endedAt: '',
    startedAt: '',
    title: '',
    updatedAt: '',
    name: '',
    userId: '',
    documentName: '',
    documentUrl: '',
  });
  const [modalType, setModalType] = useState<ModalType>('C');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [currentSchedule, setCurrentSchedule] = useState<CurrentSchedule>({
    type: '',
    teamId: [],
    userId: '',
  });
  const [isDayClick, setIsDayClick] = useState(false);
  const [clickedDate, setClickedDate] = useState<number[]>([]);
  const { userInfo, error, isLoading } = useFetchUserInfo();

  const getTeamsData = async () => {
    const teamsData = (await fetchDataFromDB({ table: 'Teams' })) as TeamData[];

    setTeamData(teamsData);

    return teamsData;
  };

  const getCurrentUserTeamsData = () => {
    const currentUserTeams = teamData.find((team) =>
      team.members.some(
        (member) => userInfo && member.userId === userInfo.userId
      )
    )?.members as TeamMembersData[];

    setCurrentSchedule({
      type: 'team',
      teamId: currentUserTeams,
      userId: '',
    });
  };

  useEffect(() => {
    getCurrentUserTeamsData();
  }, [userInfo]);

  const handleRModalOpen = (targetSchedule: TargetSchedule) => {
    setModalType('R');
    setTargetSchedule(targetSchedule);
    setIsModalOpen(true);
  };

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
          <ScheduleMain
            currentSchedule={currentSchedule}
            isDayClick={isDayClick}
            clickedDate={clickedDate}
            setIsDayClick={setIsDayClick}
            setClickedDate={setClickedDate}
            handleRModalOpen={handleRModalOpen}
          />
        </div>
        {isModalOpen && (
          <ScheduleModal
            targetSchedule={targetSchedule}
            modalType={modalType}
            setModalType={setModalType}
            setIsModalOpen={setIsModalOpen}
          />
        )}
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
