import { useEffect, useState } from 'react';
import { saveDataToDB } from '../../../../../../firebase/saveDataToDB';
import { fetchDataFromDB } from '../../../../../../firebase/fetchDataFromDB';
import FileUploading from '../../../../../../components/FileUploading';
import Button from '../../../../../../components/form/Button';
import { colors } from '../../../../../../styles';
import { fetchUserInfo } from '../../../../../../firebase';
import { User } from '../../../../../../types/interface';

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

interface TargetSchedule extends ScheduleList {
  id: string;
  index: number;
  name: string;
  userId: string;
  documentName: string;
  documentUrl: string;
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

type ModalType = 'C' | 'R' | 'U' | 'D';

interface ScheduleModalContentsProps {
  targetSchedule: TargetSchedule;
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
}

const ScheduleModalContents = ({
  modalType,
  setModalType,
  targetSchedule,
}: ScheduleModalContentsProps) => {
  const [title, setTitle] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [detail, setDetail] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [titleError, setTitleError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = fetchUserInfo((info) => {
      setCurrentUser(info);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const isValidSchedule = (
    existingSchedules: ScheduleList[],
    newSchedule: NewScheduleEntry
  ) => {
    const newStartedAt = new Date(newSchedule.startedAt).getTime();
    const newEndedAt = new Date(newSchedule.endedAt).getTime();

    if (newEndedAt < newStartedAt) {
      setTimeError('종료 시간은 시작 시간보다 과거일 수 없습니다.');
      return false;
    }

    existingSchedules.map((schedule) => {
      const existingStartedAt = new Date(schedule.startedAt).getTime();
      const existingEndedAt = new Date(schedule.endedAt).getTime();

      if (
        (newStartedAt >= existingStartedAt && newStartedAt < existingEndedAt) ||
        (newEndedAt > existingStartedAt && newEndedAt <= existingEndedAt) ||
        (newStartedAt <= existingStartedAt && newEndedAt >= existingEndedAt)
      ) {
        setTimeError('기존 일정과 겹치는 시간대입니다. 일정을 확인해주세요.');
        return false;
      }
    });

    // for (const schedule of existingSchedules) {
    //   const existingStart = new Date(schedule.startedAt).getTime();
    //   const existingEnd = new Date(schedule.endedAt).getTime();

    //   if (
    //     (newStart >= existingStart && newStart < existingEnd) ||
    //     (newEnd > existingStart && newEnd <= existingEnd) ||
    //     (newStart <= existingStart && newEnd >= existingEnd)
    //   ) {
    //     setTimeError('기존 일정과 겹치는 시간대입니다. 일정을 확인해주세요.');
    //     return false;
    //   }
    // }

    setTimeError('');

    return true;
  };

  const editSchedule = async () => {
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

      if (modalType === 'C') {
        const userId = currentUser ? currentUser.userId : null;

        const existingUserSchedule = SCHEDULE_DATA.find(
          (data) => data.userId === userId
        );

        if (
          existingUserSchedule &&
          !isValidSchedule(existingUserSchedule.scheduleList, newScheduleEntry)
        ) {
          return;
        }

        if (existingUserSchedule) {
          // 이미 존재하는 유저의 스케줄 등록의 경우
          await saveDataToDB({
            table: 'Schedule',
            key: existingUserSchedule
              ? `${existingUserSchedule.id}/scheduleList`
              : '',
            data: existingUserSchedule
              ? [...existingUserSchedule.scheduleList, newScheduleEntry]
              : '',
          });
        } else {
          // 존재하지 않던 유저의 스케줄 등록의 경우
          await saveDataToDB({
            table: 'Schedule',
            data: {
              userId,
              scheduleList: [newScheduleEntry],
            },
          });
        }
      } else if (modalType === 'U') {
        if (!isValidSchedule([targetSchedule], newScheduleEntry)) {
          return;
        }
        // 유저의 스케줄 수정의 경우
        await saveDataToDB({
          table: 'Schedule',
          key: targetSchedule.id
            ? `${targetSchedule.id}/scheduleList/${targetSchedule.index}`
            : '',
          data: newScheduleEntry,
        });
      }

      //const userId = // 등록의 경우 현재 로그인한 유저의 userId, 수정의 경우 클릭한 유저의 userId

      setTitle('');
      setStartedAt('');
      setEndedAt('');
      setDetail('');
    } catch (error) {
      console.error('Schedule creation failed:', error);
    }
  };

  const deleteSchedule = async () => {
    try {
      const clearScheduleEntry = {
        title: '',
        startedAt: '',
        endedAt: '',
        detail: '',
        documentName: '',
        documentUrl: '',
        createdAt: '',
        updatedAt: '',
      };

      await saveDataToDB({
        table: 'Schedule',
        key: targetSchedule.id
          ? `${targetSchedule.id}/scheduleList/${targetSchedule.index}`
          : '',
        data: clearScheduleEntry,
      });
    } catch (error) {
      console.error('데이터 삭제 중 오류:', error);
    }
  };

  const handleEditMode = () => {
    setTitle(targetSchedule.title);
    setStartedAt(targetSchedule.startedAt);
    setEndedAt(targetSchedule.endedAt);
    setDetail(targetSchedule.detail);
    setDocumentUrl(targetSchedule.documentUrl);
    setDocumentName(targetSchedule.documentName);
    setModalType('U');
  };

  return (
    <>
      <div style={{ fontSize: '20px', fontWeight: '700' }}>
        {modalType === 'R'
          ? `${targetSchedule.name}님의 일정`
          : '새로운 일정 등록'}
      </div>

      <div>제목</div>
      <input
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.title : title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="일정 제목"
      />
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {titleError}
      </div>
      <div>시작 시간</div>
      <input
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.startedAt : startedAt}
        onChange={(e) => setStartedAt(e.target.value)}
        type="datetime-local"
      />
      <div>종료 시간</div>
      <input
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.endedAt : endedAt}
        onChange={(e) => setEndedAt(e.target.value)}
        type="datetime-local"
      />
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {timeError}
      </div>
      <div>첨부 파일</div>

      {targetSchedule.documentName ? (
        <div>{targetSchedule.documentName}</div>
      ) : (
        <FileUploading
          filePath="schedule-doc"
          setUrl={setDocumentUrl}
          setName={setDocumentName}
        />
      )}
      <div>내용</div>
      <textarea
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.detail : detail}
        onChange={(e) => setDetail(e.target.value)}
        name="content"
        id=""
        placeholder="일정 내용"
      ></textarea>
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {detailError}
      </div>
      {modalType === 'C' && (
        <Button color="success" text="등록" onClick={editSchedule} />
      )}
      {modalType === 'R' && (
        <div>
          <Button color="success" text="수정" onClick={handleEditMode} />
          <Button color="danger" text="삭제" onClick={deleteSchedule} />
        </div>
      )}
      {modalType === 'U' && (
        <Button color="success" text="등록" onClick={editSchedule} />
      )}
    </>
  );
};

export default ScheduleModalContents;