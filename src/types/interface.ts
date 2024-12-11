// Firebase collection 기준 타입 정의

export interface User {
  userId: string;
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
  employeeNumber: string;
  address: string;
  addressDetail: string;
  profileImgUrl: string;
  position: string;
  team: string;
  department: string;
  isAdmin: boolean;
  isActivated: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface Schedule {
  scheduleId: string;
  userId: string;
  scheduleList: ScheduleItem[];
}

export interface ScheduleItem {
  id: string; // ISO timestamp
  title: string;
  startedAt: string; // ISO timestamp
  endedAt: string; // ISO timestamp
  assignee: string[]; // 담당자들의 userId | [ 'userId', 'userId', 'userId' ]
  documentUrl: string;
  detail: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface Salary {
  salaryId: string;
  userId: string;
  amountList: SalaryAmount[];
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface SalaryAmount {
  id: string;
  amount: number;
  totalWorkingTime: number; // 분 단위
  totalOverWorkingTime: number; // 분 단위
  totalNightWorkingTime: number; // 분 단위
  type: 'monthly' | 'extra';
  createdAt: string; // ISO timestamp
}

export interface SalaryRequest {
  salaryId: string;
  salaryRequestId: string;
  requestedUserId: string; // 정정 신청한 직원
  requestList: SalaryRequestItem[];
  requestedAt: string; // ISO timestamp
  handledUserId?: string; // 정정 신청을 처리한 관리자, 정정 신청 처리 전인 경우 담당자가 없기에 옵셔널
  handleStatus: '처리 전' | '승인' | '거부';
  handleDetail?: string; // 정정 신청 처리 전인 경우 사유가 없기에 옵셔널
  handledAt?: string; // ISO timestamp, 정정 신청 처리 전인 경우 없기에 옵셔널
}

export interface SalaryRequestItem {
  requestId: string;
  requestStartedAt: string; // ISO timestamp
  requestEndedAt: string; // ISO timestamp
  requestWorkingTime: number;
  requestDetail: string;
  requestDocumentUrl?: string; // 필수 삽입은 아니기에 옵셔널
}

export interface Teams {
  teamId: string;
  name: string;
  member: TeamMember[];
}

export interface TeamMember {
  userId: string;
  name: string;
}

export interface Attendance {
  attendanceId: string;
  checkInTime: string;
  checkOutTime: string;
  nightWorkingTime: string;
  overWorkingTime: string;
  userId: string;
  workStatus: boolean;
  workingTime: string;
}
