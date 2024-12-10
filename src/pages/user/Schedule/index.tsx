import styled from 'styled-components';
import ScheduleHeader from './ScheduleHeader';
import ScheduleMain from './ScheduleMain';
import ScheduleSideBar from './ScheduleSideBar';
import { useEffect, useState } from 'react';
import AddScheduleModal from './core/AddScheduleModal';
import { fetchDataFromDB } from '../../../firebase/fetchDataFromDB';

const Schedule = () => {
  const CURRENT_MONTH = new Date().getMonth() + 1;
  const CURRENT_YEAR = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(CURRENT_MONTH);
  const [currentYear, setCurrentYear] = useState(CURRENT_YEAR);
  const [isSixWeek, setIsSixWeek] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  interface TeamData {
    id: string;
    name: string;
    members: TeamMembersData[];
  }

  interface TeamMembersData {
    name: string;
    userId: string;
  }

  const handleYearMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const getTeamsData = async () => {
    const teamsData = await fetchDataFromDB('Teams');
    const formattedTeamsData: TeamData[] = teamsData
      ? Object.entries(teamsData).map(([id, teamData]) => ({
          id,
          name: teamData.name,
          members: teamData.members || [],
        }))
      : [];

    console.log(formattedTeamsData);
    setTeamData(formattedTeamsData);

    return formattedTeamsData;
  };

  useEffect(() => {
    getTeamsData();
  }, []);

  return (
    <>
      <S.Wrapper>
        <ScheduleSideBar isSixWeek={isSixWeek} teamData={teamData} />
        <div>
          <ScheduleHeader
            currentMonth={currentMonth}
            currentYear={currentYear}
            handleYearMonthChange={handleYearMonthChange}
            setIsAddScheduleModalOpen={setIsAddScheduleModalOpen}
          />
          <ScheduleMain
            currentMonth={currentMonth}
            currentYear={currentYear}
            setIsSixWeek={setIsSixWeek}
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
    height: 100dvh;
  `,
};

export default Schedule;
