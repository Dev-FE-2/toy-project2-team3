import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import { useEffect, useState } from 'react';
import { fetchDataFromDB } from '../../../firebase/fetchDataFromDB';
import ScheduleModal from './core/ScheduleModal';

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
}

type ModalType = 'C' | 'R' | 'U' | 'D';

const Schedule = () => {
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(CURRENT_MONTH);
  const [currentYear, setCurrentYear] = useState(CURRENT_YEAR);
  const [isSixWeek, setIsSixWeek] = useState(false);
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

  const handleYearMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const getTeamsData = async () => {
    const teamsData = (await fetchDataFromDB({ table: 'Teams' })) as TeamData[];

    setTeamData(teamsData);

    return teamsData;
  };

  const handleCModalOpen = () => {
    setModalType('C');
    setIsModalOpen(true);
  };

  const handleRModalOpen = (targetSchedule: TargetSchedule) => {
    setModalType('R');
    setTargetSchedule(targetSchedule);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTeamsData();
  }, []);

  return (
    <>
      <S.Wrapper>
        <ScheduleSideBar
          isSixWeek={isSixWeek}
          isDayClick={isDayClick}
          teamData={teamData}
          setCurrentSchedule={setCurrentSchedule}
        />
        <div>
          <ScheduleHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            isDayClick={isDayClick}
            clickedDate={clickedDate}
            teamData={teamData}
            handleYearMonthChange={handleYearMonthChange}
            handleCModalOpen={handleCModalOpen}
            setIsDayClick={setIsDayClick}
          />
          <ScheduleMain
            currentSchedule={currentSchedule}
            currentMonth={currentMonth}
            currentYear={currentYear}
            isDayClick={isDayClick}
            clickedDate={clickedDate}
            setIsSixWeek={setIsSixWeek}
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
