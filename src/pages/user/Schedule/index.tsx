import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import { useEffect, useState } from 'react';
import AddScheduleModal from './core/AddScheduleModal';
import { fetchDataFromDB } from '../../../firebase/fetchDataFromDB';

interface TeamData {
  id: string;
  name: string;
  members: TeamMembersData[];
}

interface TeamMembersData {
  name: string;
  userId: string;
}

interface CurrentSchedule {
  type: string;
  teamId: TeamMembersData[];
  userId?: string;
}

const Schedule = () => {
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(CURRENT_MONTH);
  const [currentYear, setCurrentYear] = useState(CURRENT_YEAR);
  const [isSixWeek, setIsSixWeek] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [currentSchedule, setCurrentSchedule] = useState<CurrentSchedule>({
    type: '',
    teamId: [],
    userId: '',
  });
  const [isDayClick, setIsDayClick] = useState(false);

  const handleYearMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const getTeamsData = async () => {
    const teamsData = (await fetchDataFromDB({ table: 'Teams' })) as TeamData[];

    setTeamData(teamsData);

    return teamsData;
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
            handleYearMonthChange={handleYearMonthChange}
            setIsAddScheduleModalOpen={setIsAddScheduleModalOpen}
            setIsDayClick={setIsDayClick}
          />
          <ScheduleMain
            currentSchedule={currentSchedule}
            currentMonth={currentMonth}
            currentYear={currentYear}
            isDayClick={isDayClick}
            setIsSixWeek={setIsSixWeek}
            setIsDayClick={setIsDayClick}
          />
        </div>
        {isAddScheduleModalOpen && (
          <AddScheduleModal
            setIsAddScheduleModalOpen={setIsAddScheduleModalOpen}
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
