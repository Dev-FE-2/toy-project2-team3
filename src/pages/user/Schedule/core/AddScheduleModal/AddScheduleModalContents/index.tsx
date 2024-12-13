import { useState } from 'react';
import { saveDataToDB } from '../../../../../../firebase/saveDataToDB';
import { fetchDataFromDB } from '../../../../../../firebase/fetchDataFromDB';
import FileUploading from '../../../../../../components/FileUploading';
import Button from '../../../../../../components/form/Button';
import { colors } from '../../../../../../styles';

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

interface NewScheduleEntry {
  title: string;
  startedAt: string;
  endedAt: string;
  detail: string;
  documentName: string;
  documentUrl: string;
  createdAt: string;
  updatedAt: string;
}

const AddScheduleModalContents = () => {
  const [title, setTitle] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [detail, setDetail] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [titleError, setTitleError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [timeError, setTimeError] = useState('');

  const isValidSchedule = (
    existingSchedules: ScheduleList[],
    newSchedule: NewScheduleEntry
  ) => {
    const newStart = new Date(newSchedule.startedAt).getTime();
    const newEnd = new Date(newSchedule.endedAt).getTime();

    if (newEnd < newStart) {
      setTimeError('종료 시간은 시작 시간보다 과거일 수 없습니다.');
      return false;
    }

    for (const schedule of existingSchedules) {
      const existingStart = new Date(schedule.startedAt).getTime();
      const existingEnd = new Date(schedule.endedAt).getTime();

      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      ) {
        setTimeError('기존 일정과 겹치는 시간대입니다. 일정을 확인해주세요.');
        return false;
      }
    }

    setTimeError('');

    return true;
  };

  const createTempSchedule = async () => {
    try {
      if (!title.trim()) {
        setTitleError('제목을 입력해주세요.');
        return;
      }

      setTitleError('');

      if (!detail.trim()) {
        setDetailError('내용을 입력해주세요.');
        return;
      }

      setDetailError('');

      const userId = '36mBmF0i6jhfXKzJr9Aq2NgOuju2'; // 실제 사용자 ID로 대체할 예정
      const SCHEDULE_DATA = (await fetchDataFromDB({
        table: 'Schedule',
      })) as ScheduleData[];

      const newScheduleEntry = {
        title,
        startedAt,
        endedAt,
        detail,
        documentName,
        documentUrl,
        createdAt: new Date().toISOString(),
        updatedAt: '',
      };

      const existingUserSchedule = SCHEDULE_DATA.find(
        (data) => data.userId === userId
      );

      if (
        existingUserSchedule &&
        !isValidSchedule(existingUserSchedule.scheduleList, newScheduleEntry)
      ) {
        return; // 유효성 검사를 통과하지 못하면 등록하지 않음
      }

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

  return (
    <>
      <div>제목</div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="일정 제목"
      />
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {titleError}
      </div>
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
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {timeError}
      </div>
      <div>첨부 파일</div>
      <FileUploading
        filePath="schedule-doc"
        setUrl={setDocumentUrl}
        setName={setDocumentName}
      />
      <div>내용</div>
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        name="content"
        id=""
        placeholder="일정 내용"
      ></textarea>
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {detailError}
      </div>
      <Button color="success" text="등록하기" onClick={createTempSchedule} />
    </>
  );
};

export default AddScheduleModalContents;
