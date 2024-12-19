import { useState } from 'react';
import { ScheduleList } from '../types/schedule';

export const useScheduleValidation = () => {
  const [timeError, setTimeError] = useState('');

  const isValidSchedule = (
    existingSchedules: ScheduleList[],
    newSchedule: ScheduleList,
    isUpdate: boolean = false
  ): boolean => {
    const newStartedAt = new Date(newSchedule.startedAt).getTime();
    const newEndedAt = new Date(newSchedule.endedAt).getTime();

    if (newEndedAt < newStartedAt) {
      setTimeError('종료 시간은 시작 시간보다 과거일 수 없습니다.');
      return false;
    }

    const ONE_DAY = 24 * 60 * 60 * 1000;
    const timeDifference = newEndedAt - newStartedAt;

    if (timeDifference > ONE_DAY) {
      setTimeError('일정은 최대 24시간까지만 등록 가능합니다.');
      return false;
    }

    const checkedExistingSchedule = isUpdate
      ? existingSchedules.filter(
          (schedule) => schedule.createdAt !== newSchedule.createdAt
        )
      : existingSchedules;

    for (const schedule of checkedExistingSchedule) {
      const existingStartedAt = new Date(schedule.startedAt).getTime();
      const existingEndedAt = new Date(schedule.endedAt).getTime();

      const isOverlap =
        (newStartedAt >= existingStartedAt && newStartedAt < existingEndedAt) ||
        (newEndedAt > existingStartedAt && newEndedAt <= existingEndedAt) ||
        (newStartedAt <= existingStartedAt && newEndedAt >= existingEndedAt);

      if (isOverlap) {
        setTimeError('기존 일정과 겹치는 시간대입니다. 일정을 확인해주세요.');
        return false;
      }
    }

    setTimeError('');
    return true;
  };

  return { isValidSchedule, timeError, setTimeError };
};
