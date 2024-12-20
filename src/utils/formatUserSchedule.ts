import type { CurrentSchedule, ScheduleData } from '../types/schedule';

export const formatUserSchedule = (
  currentSchedule: CurrentSchedule,
  scheduleData: ScheduleData[]
) => {
  const userScheduleData = scheduleData.find(
    (schedule) => schedule.userId === currentSchedule.userId
  );

  const userInfo = currentSchedule.teamId.find((id) =>
    userScheduleData ? id.userId === userScheduleData.userId : ''
  );

  const formattedUserSchedule = userScheduleData
    ? [
        {
          type: currentSchedule.type,
          name: userInfo ? userInfo.name : '',
          number: userInfo ? userInfo.number : 0,
          ...userScheduleData,
        },
      ]
    : [];

  return formattedUserSchedule;
};
