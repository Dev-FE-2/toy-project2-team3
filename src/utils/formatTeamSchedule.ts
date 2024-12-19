import type { CurrentSchedule, ScheduleData } from '../types/schedule';

export const formatTeamSchedule = (
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

    return {
      ...schedule,
      type: currentSchedule.type,
      name: teamMemberInfo ? teamMemberInfo.name : '',
      number: teamMemberInfo ? teamMemberInfo.number : 0,
    };
  });

  return formattedTeamSchedule;
};
