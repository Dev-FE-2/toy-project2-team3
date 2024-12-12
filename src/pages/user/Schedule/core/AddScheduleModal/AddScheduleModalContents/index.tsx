import { useState } from 'react';
import { saveDataToDB } from '../../../../../../firebase/saveDataToDB';
import { fetchDataFromDB } from '../../../../../../firebase/fetchDataFromDB';

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
  title: string;
  updatedAt: string;
}

interface ScheduleData {
  id: string;
  scheduleList: ScheduleList[];
  userId: string;
}

const AddScheduleModalContents = () => {
  const [title, setTitle] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [detail, setDetail] = useState('');

  const createTempSchedule = async () => {
    try {
      const userId = '36mBmF0i6jhfXKzJr9Aq2NgOuju2'; // 실제 사용자 ID로 대체할 예정
      const SCHEDULE_DATA = (await fetchDataFromDB({
        table: 'Schedule',
      })) as ScheduleData[];

      console.log(SCHEDULE_DATA);

      const newScheduleEntry = {
        title,
        startedAt,
        endedAt,
        detail,
        createdAt: new Date().toISOString(),
        updatedAt: '',
      };

      const existingUserSchedule = SCHEDULE_DATA.find(
        (data) => data.userId === userId
      );

      if (existingUserSchedule) {
        // 기존 사용자가 있는 경우
        const updatedScheduleList = [
          ...existingUserSchedule.scheduleList,
          newScheduleEntry,
        ];

        await saveDataToDB({
          table: 'Schedule',
          key: existingUserSchedule ? existingUserSchedule.id : '',
          data: {
            ...existingUserSchedule,
            scheduleList: updatedScheduleList,
          },
        });
      } else {
        // 기존 사용자가 없는 경우 새로 추가
        await saveDataToDB({
          table: 'Schedule',
          data: {
            userId,
            scheduleList: [newScheduleEntry],
          },
        });
      }

      setTitle('');
      setStartedAt('');
      setEndedAt('');
      setDetail('');
    } catch (error) {
      console.error('Schedule creation failed:', error);
    }
  };

  // 모든 인풋 완성 후 유효성 검사 추가할 예정

  return (
    <>
      <div>제목</div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="일정 제목"
      />
      <div>시작 시간</div>
      <input
        value={startedAt}
        onChange={(e) => setStartedAt(e.target.value)}
        type="datetime-local"
      />
      <div>종료 시간</div>
      <input
        value={endedAt}
        onChange={(e) => setEndedAt(e.target.value)}
        type="datetime-local"
      />
      <div>담당자</div>
      {/* <select name="assignee" id="">
        <option value="">담당자 선택</option>
        <option value="">김둘둘</option>
        <option value="">김셋셋</option>
        <option value="">김넷넷</option>
      </select> */}{' '}
      {/* 회원가입 기능 완료 후 추가할 예정 */}
      {/* <div>첨부파일</div>
      <input type="file" /> */}{' '}
      {/* 유틸함수 머지 후 추가할 예정 */}
      <div>내용</div>
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        name="content"
        id=""
        placeholder="일정 내용"
      ></textarea>
      <button onClick={createTempSchedule}>등록하기</button>
    </>
  );
};

export default AddScheduleModalContents;
