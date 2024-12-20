interface TeamMembersData {
  name: string;
  userId: string;
  number: number;
}

interface TeamData {
  id: string;
  name: string;
  members: TeamMembersData[];
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
  documentName?: string | undefined;
  documentUrl?: string | undefined;
}

interface ScheduleData {
  id: string;
  scheduleList: ScheduleList[];
  userId: string;
}

interface FormattedUserOrTeamScheduleData extends ScheduleData {
  type: string;
  name: string;
  number: number;
}

interface TargetSchedule extends ScheduleList {
  id: string;
  // index: number;
  name: string;
  userId: string;
}

type ModalType = 'C' | 'R' | 'U' | 'D';

export type {
  TeamMembersData,
  TeamData,
  CurrentSchedule,
  ScheduleList,
  ScheduleData,
  FormattedUserOrTeamScheduleData,
  TargetSchedule,
  ModalType,
};
